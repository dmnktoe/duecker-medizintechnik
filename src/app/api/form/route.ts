import * as Sentry from '@sentry/nextjs';
import { NextRequest, NextResponse } from 'next/server';

import { verifyContactChallenge } from '@/lib/contact/altcha';
import { getContactConfig } from '@/lib/contact/config';
import {
  renderConfirmationEmail,
  renderInternalEmail,
} from '@/lib/contact/emails';
import { createMailer } from '@/lib/contact/mailer';
import { createRateLimiter, getClientIp } from '@/lib/contact/rate-limit';
import { createReference } from '@/lib/contact/reference';
import {
  type ContactApiResponse,
  type ContactFieldName,
  contactRequestSchema,
} from '@/lib/contact/schema';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 32 * 1024;
const rateLimit = createRateLimiter({ limit: 5, windowMs: 15 * 60 * 1000 });

function json(body: ContactApiResponse, status = 200, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', ...headers },
  });
}

export async function POST(request: NextRequest) {
  let raw: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) {
      return json({ ok: false, error: 'invalid_request' }, 413);
    }
    raw = JSON.parse(text);
  } catch {
    return json({ ok: false, error: 'invalid_request' }, 400);
  }

  const limited = rateLimit(getClientIp(request.headers));
  if (!limited.allowed) {
    return json({ ok: false, error: 'rate_limited' }, 429, {
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
    return json({ ok: false, error: 'validation_failed', fields }, 422);
  }
  const { altcha, website, locale, ...fields } = parsed.data;

  let config;
  try {
    config = getContactConfig();
  } catch (err) {
    Sentry.captureException(err, { tags: { feature: 'contact-form' } });
    return json({ ok: false, error: 'not_configured' }, 500);
  }

  const captcha = await verifyContactChallenge(altcha, config.altchaSecret);
  if (!captcha.ok) {
    Sentry.captureMessage('Contact form: spam check failed', {
      level: 'warning',
      tags: { feature: 'contact-form' },
      extra: { reason: captcha.reason },
    });
    return json({ ok: false, error: 'captcha_failed' }, 403);
  }

  const reference = createReference();

  if (website.trim() !== '') {
    return json({ ok: true, reference });
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
    return json({ ok: false, error: 'send_failed' }, 502);
  }

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

  return json({ ok: true, reference });
}
