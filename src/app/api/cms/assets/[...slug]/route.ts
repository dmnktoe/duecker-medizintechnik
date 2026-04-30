import { NextRequest, NextResponse } from 'next/server';

import { directusApiToken, directusUrl } from '@/constant/env';

const FILE_ID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await context.params;
  const segments = (slug ?? []).filter((s) => s.length > 0);
  if (!segments.length || !FILE_ID_RE.test(segments[0])) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  const base = (directusUrl ?? '').replace(/\/+$/, '');
  if (!base || !directusApiToken) {
    return new NextResponse('Service Unavailable', { status: 503 });
  }

  const assetPath = segments.join('/');
  const upstream = new URL(`/assets/${assetPath}`, `${base}/`);
  upstream.search = request.nextUrl.search;

  const upstreamRes = await fetch(upstream, {
    headers: { Authorization: `Bearer ${directusApiToken}` },
    next: { revalidate: 86_400 },
  });

  if (!upstreamRes.ok) {
    return new NextResponse(upstreamRes.statusText, {
      status: upstreamRes.status,
    });
  }

  const headers = new Headers();
  const contentType = upstreamRes.headers.get('content-type');
  if (contentType) headers.set('content-type', contentType);
  const contentLength = upstreamRes.headers.get('content-length');
  if (contentLength) headers.set('content-length', contentLength);
  headers.set(
    'cache-control',
    'public, max-age=86400, stale-while-revalidate=604800',
  );

  return new NextResponse(upstreamRes.body, {
    status: 200,
    headers,
  });
}
