import { directusUrl } from '@/constant/env';

export function getDirectusURL(path = '') {
  const base = (directusUrl ?? '').replace(/\/+$/, '');
  return `${base}${path}`;
}

function cmsAssetOrigin(): string | null {
  try {
    const base = (directusUrl ?? '').replace(/\/+$/, '');
    if (!base) return null;
    return new URL(base.match(/^https?:\/\//i) ? base : `https://${base}`)
      .origin;
  } catch {
    return null;
  }
}

function resolveFileRefString(ref: string): string {
  if (ref.startsWith('http') || ref.startsWith('//')) {
    return ref.startsWith('//') ? `https:${ref}` : ref;
  }
  if (ref.startsWith('/')) {
    return getDirectusURL(ref);
  }
  return getDirectusURL(`/assets/${ref}`);
}

function proxiedPath(tail: string, search: string): string {
  const path = tail.replace(/^\/+|\/+$/g, '');
  return `/api/cms/assets/${path}${search}`;
}

function withAssetProxyIfDirectusHosted(resolved: string): string {
  const cms = cmsAssetOrigin();
  if (!cms) return resolved;

  try {
    const assetUrl = new URL(resolveFileRefString(resolved));
    if (assetUrl.origin !== cms) return resolved;

    const prefix = '/assets/';
    if (!assetUrl.pathname.startsWith(prefix)) return resolved;

    const tail = assetUrl.pathname.slice(prefix.length).replace(/^\/+/, '');
    if (!tail) return resolved;

    return proxiedPath(tail, assetUrl.search);
  } catch {
    return resolved;
  }
}

export function getDirectusAssetUrl(
  fileOrUrl: string | { id: string; url?: string | null } | null | undefined,
): string {
  if (fileOrUrl == null) {
    return '';
  }

  if (typeof fileOrUrl === 'object') {
    if (fileOrUrl.url) {
      return withAssetProxyIfDirectusHosted(fileOrUrl.url);
    }
    if (fileOrUrl.id) {
      return withAssetProxyIfDirectusHosted(
        getDirectusURL(`/assets/${fileOrUrl.id}`),
      );
    }
    return '';
  }

  return withAssetProxyIfDirectusHosted(resolveFileRefString(fileOrUrl));
}
