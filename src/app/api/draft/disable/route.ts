import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Exits Draft Mode. Call this with a `?redirect=/some/path` query parameter
 * to be redirected back to a normal (cached) page render.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const redirect = searchParams.get('redirect') ?? '/';

  const draft = await draftMode();
  draft.disable();

  return NextResponse.redirect(new URL(redirect, request.url));
}
