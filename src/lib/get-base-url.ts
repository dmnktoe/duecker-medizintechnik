/**
 * Site origin (no trailing slash). Used for sitemap/robots and other absolute URLs.
 * Prefer `NEXT_PUBLIC_APP_URL` in all environments; falls back to Vercel URL or localhost.
 */
export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '');
  }

  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`.replace(/\/$/, '');
  }

  if (process.env.NODE_ENV === 'production') {
    return 'https://www.duecker-medizintechnik.de';
  }

  return 'http://localhost:3000';
};
