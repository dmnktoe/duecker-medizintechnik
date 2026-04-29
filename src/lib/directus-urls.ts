import { directusUrl } from '@/constant/env';

/**
 * Returns the configured Directus base URL with any trailing slash stripped,
 * optionally followed by `path` (which should start with `/`).
 */
export function getDirectusURL(path = '') {
  const base = (directusUrl ?? '').replace(/\/+$/, '');
  return `${base}${path}`;
}

/**
 * Builds the public URL for a file stored in Directus' `directus_files`.
 *
 * Accepts either:
 *  - a full URL (e.g. for files stored on an external provider). In that case
 *    the URL is returned unchanged.
 *  - a relative path (e.g. `/assets/<id>`). The configured Directus base URL
 *    is prepended.
 *  - a Directus file id (UUID string). The standard `/assets/<id>` route is
 *    appended to the configured Directus base URL.
 */
export function getDirectusAssetUrl(
  fileOrUrl: string | { id: string; url?: string | null } | null | undefined,
): string {
  if (fileOrUrl == null) {
    return '';
  }

  if (typeof fileOrUrl === 'object') {
    if (fileOrUrl.url) {
      return getDirectusAssetUrl(fileOrUrl.url);
    }
    if (fileOrUrl.id) {
      return getDirectusURL(`/assets/${fileOrUrl.id}`);
    }
    return '';
  }

  if (fileOrUrl.startsWith('http') || fileOrUrl.startsWith('//')) {
    return fileOrUrl;
  }

  if (fileOrUrl.startsWith('/')) {
    return getDirectusURL(fileOrUrl);
  }

  // Treat as a bare file id.
  return getDirectusURL(`/assets/${fileOrUrl}`);
}
