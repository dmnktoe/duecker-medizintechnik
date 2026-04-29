import { readItems } from '@directus/sdk';
import { NextRequest, NextResponse } from 'next/server';

import { directus } from '@/lib/directus';

import {
  directusApiToken,
  directusPreviewSecret,
  directusUrl,
} from '@/constant/env';

/**
 * Diagnostic endpoint for debugging the Directus integration.
 *
 * Hit this URL (locally `http://localhost:3000/api/cms/diagnostics`) to see at
 * a glance:
 *  - whether the env vars are set (without leaking the secret values),
 *  - whether the configured Directus URL is reachable (`/server/ping`),
 *  - whether the auth token has read access to each of the collections we
 *    rely on, and how many published items each has.
 *
 * In production we require a `?secret=$DIRECTUS_PREVIEW_SECRET` parameter so
 * the endpoint isn't exposed publicly.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const isProduction = process.env.NODE_ENV === 'production';
  if (
    isProduction &&
    (!directusPreviewSecret || secret !== directusPreviewSecret)
  ) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  const env = {
    NEXT_PUBLIC_DIRECTUS_URL: directusUrl || null,
    DIRECTUS_API_TOKEN_set: Boolean(directusApiToken),
    DIRECTUS_PREVIEW_SECRET_set: Boolean(directusPreviewSecret),
  };

  const checks: Record<string, unknown> = {};

  // 1. Server reachability
  try {
    const pingUrl = `${directusUrl?.replace(/\/+$/, '')}/server/ping`;
    const res = await fetch(pingUrl, { cache: 'no-store' });
    checks.serverPing = {
      ok: res.ok,
      status: res.status,
      url: pingUrl,
      body: (await res.text()).slice(0, 100),
    };
  } catch (error) {
    checks.serverPing = {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }

  // 2. Sample collections
  for (const collection of [
    'posts',
    'categories',
    'authors',
    'downloads',
    'download_categories',
  ] as const) {
    try {
      const items = (await directus.request(
        readItems(collection, {
          fields: ['id'],
          limit: -1,
        }),
      )) as unknown as Array<{ id: unknown }>;
      checks[collection] = {
        ok: true,
        count: items.length,
        firstId: items[0]?.id ?? null,
      };
    } catch (error) {
      const e = error as {
        response?: { status?: number };
        errors?: Array<{ message?: string }>;
        message?: string;
      };
      checks[collection] = {
        ok: false,
        status: e.response?.status,
        message: e.errors?.[0]?.message ?? e.message ?? 'Unknown error',
      };
    }
  }

  return NextResponse.json(
    { env, checks, generatedAt: new Date().toISOString() },
    { headers: { 'cache-control': 'no-store' } },
  );
}
