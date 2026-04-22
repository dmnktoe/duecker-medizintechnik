import { draftMode } from 'next/headers';

import { directusApiToken, directusUrl, isLocal } from '@/constant/env';

type FetchDirectusInit = Omit<RequestInit, 'next'> & {
  /** Override Next.js cache. Defaults to `revalidate: 60`. In draft mode the response is always uncached. */
  next?: RequestInit['next'] | { revalidate?: number | false; tags?: string[] };
  /** When true (or omitted), the response is parsed as JSON and the `data` field of the Directus envelope is returned. */
  unwrap?: boolean;
};

const REVALIDATE_SECONDS_DEFAULT = 60;

/**
 * Thin REST helper for Directus. Prefer the typed SDK from `@/lib/directus`
 * for new code – this exists to keep call sites compact (e.g. for raw URLs)
 * and to centralise auth + caching behaviour.
 */
export async function fetchDirectus<T = unknown>(
  path: string,
  options: FetchDirectusInit = {},
): Promise<T> {
  const { unwrap = true, next, headers, ...rest } = options;

  let isDraft = false;
  try {
    isDraft = (await draftMode()).isEnabled;
  } catch {
    // `draftMode` only works in request scope (route handlers, server
    // components, etc.). Outside of that – e.g. in `generateStaticParams` –
    // it throws; we fall back to the cached/published response.
  }

  const requestUrl = path.startsWith('http')
    ? path
    : `${directusUrl}${path.startsWith('/') ? '' : '/'}${path}`;

  const mergedHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(directusApiToken
      ? { Authorization: `Bearer ${directusApiToken}` }
      : {}),
    ...(headers as Record<string, string> | undefined),
  };

  const cacheConfig: RequestInit['next'] = isDraft
    ? { revalidate: 0 }
    : ((next as RequestInit['next']) ?? {
        revalidate: REVALIDATE_SECONDS_DEFAULT,
      });

  try {
    const response = await fetch(requestUrl, {
      ...rest,
      headers: mergedHeaders,
      cache: isDraft ? 'no-store' : rest.cache,
      next: cacheConfig,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }

    const json = (await response.json()) as { data?: T } & T;
    return (unwrap && json && 'data' in json ? json.data : json) as T;
  } catch (error) {
    if (isLocal) {
      // eslint-disable-next-line no-console
      console.error('[directus] request failed:', requestUrl, error);
    }
    throw new Error(
      `Directus fetch failed for ${path}: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    );
  }
}
