import * as Sentry from '@sentry/nextjs';
import { NextRequest, NextResponse } from 'next/server';

import { verifyContactChallenge } from '@/lib/contact/altcha';
import { ContactConfigError, getContactConfig } from '@/lib/contact/config';
import {
  renderConfirmationEmail,
  renderInternalEmail,
} from '@/lib/contact/emails';
import { createMailer } from '@/lib/contact/mailer';
import { createRateLimiter, getClientIp } from '@/lib/contact/rate-limit';
import { createReference } from '@/lib/contact/reference';
import {
  type ContactApiResponse,
  type ContactErrorCode,
  type ContactFieldName,
  contactRequestSchema,
} from '@/lib/contact/schema';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 32 * 1024;
const rateLimit = createRateLimiter({ limit: 5, windowMs: 15 * 60 * 1000 });

function reply(
  body: ContactApiResponse,
  status: number,
  headers?: HeadersInit,
) {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', ...headers },
  });
}

const fail = (
  error: ContactErrorCode,
  status: number,
  extra?: Omit<Extract<ContactApiResponse, { ok: false }>, 'ok' | 'error'>,
  headers?: HeadersInit,
) => reply({ ok: false, error, ...extra }, status, headers);

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > MAX_BODY_BYTES) return fail('invalid_request', 413);

  let raw: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return fail('invalid_request', 413);
    raw = JSON.parse(text);
  } catch {
    return fail('invalid_request', 400);
  }

  const ip = getClientIp(request.headers);
  const limited = rateLimit(ip);
  if (!limited.allowed) {
    return fail('rate_limited', 429, undefined, {
      'Retry-After': String(limited.retryAfterSeconds),
    });
  }

  const parsed = contactRequestSchema.safeParse(raw);
  if (!parsed.success) {
    const fields: Partial<Record<ContactFieldName, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ContactFieldName;
      if (typeof key === 'string' && !fields[key]) fields[key] = issue.message;
    }
    return fail('validation_failed', 422, { fields });
  }
  const { altcha, website, locale, ...fields } = parsed.data;

  let config;
  try {
    config = getContactConfig();
  } catch (err) {
    Sentry.captureException(err, { tags: { feature: 'contact-form' } });
    return fail(
      err instanceof ContactConfigError ? 'not_configured' : 'send_failed',
      500,
    );
  }

  const captcha = await verifyContactChallenge(altcha, config.altchaSecret);
  if (!captcha.ok) {
    Sentry.captureMessage('Contact form: spam check failed', {
      level: 'warning',
      tags: { feature: 'contact-form' },
      extra: { reason: captcha.reason },
    });
    return fail('captcha_failed', 403);
  }

  const reference = createReference();

  // Bots fill every field. Pretend it worked so they don't adapt.
  if (website.trim() !== '') {
    return reply({ ok: true, reference }, 200);
  }

  const mailer = createMailer(config);

  try {
    await mailer.send({
      to: config.inbox,
      replyTo: { name: fields.name, address: fields.email },
      ...renderInternalEmail(fields, {
        reference,
        locale,
        receivedAt: new Date(),
      }),
    });
  } catch (err) {
    Sentry.captureException(err, {
      tags: { feature: 'contact-form', step: 'notify-team' },
      extra: { reference },
    });
    return fail('send_failed', 502);
  }

  // The enquiry is safe at this point. A failed receipt is worth knowing
  // about, but must not show the visitor an error.
  try {
    await mailer.send({
      to: { name: fields.name, address: fields.email },
      replyTo: config.inbox,
      autoReply: true,
      ...renderConfirmationEmail(fields, { reference, locale }),
    });
  } catch (err) {
    Sentry.captureException(err, {
      level: 'warning',
      tags: { feature: 'contact-form', step: 'confirm-visitor' },
      extra: { reference },
    });
  }

  return reply({ ok: true, reference }, 200);
}
