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
