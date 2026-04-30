import type { NextRequest } from 'next/server';

/**
 * Site origin (no trailing slash). Used for sitemap/robots and other absolute URLs.
 * Set `NEXT_PUBLIC_APP_URL` in production (e.g. Coolify) to the public origin, e.g.
 * `https://duecker-medizintechnik.de`.
 */
export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '');
  }

  if (process.env.NODE_ENV === 'production') {
    return 'https://duecker-medizintechnik.de';
  }

  return 'http://localhost:3000';
};

/**
 * Origin for absolute redirects from Route Handlers. Prefer `NEXT_PUBLIC_APP_URL`,
 * then proxy headers (Coolify/Traefik), then {@link getBaseUrl}.
 *
 * `new URL(path, request.url)` is wrong behind a reverse proxy: `request.url`
 * often reflects the internal host (e.g. `https://localhost:3000`), which breaks
 * Directus Live Preview when the iframe loads the public domain first.
 */
export function getRedirectOriginFromRequest(request: NextRequest): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '');
  if (fromEnv) return fromEnv;

  const xfHost = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim();
  const xfProto = request.headers
    .get('x-forwarded-proto')
    ?.split(',')[0]
    ?.trim();

  if (xfHost) {
    const proto =
      xfProto === 'http' || xfProto === 'https' ? xfProto : 'https';
    try {
      return new URL(`${proto}://${xfHost}`).origin;
    } catch {
      // fall through
    }
  }

  return getBaseUrl();
}
