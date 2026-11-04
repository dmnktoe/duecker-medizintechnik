import * as Sentry from '@sentry/nextjs';
import { NextResponse } from 'next/server';

import { createContactChallenge } from '@/lib/contact/altcha';
import { getContactConfig } from '@/lib/contact/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { altchaSecret } = getContactConfig();
    const challenge = await createContactChallenge(altchaSecret);
    return NextResponse.json(challenge, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (err) {
    Sentry.captureException(err, { tags: { feature: 'contact-form' } });
    return NextResponse.json(
      { ok: false, error: 'not_configured' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
