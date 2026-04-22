import {
  authentication,
  createDirectus,
  rest,
  staticToken,
} from '@directus/sdk';

import { directusApiToken, directusUrl } from '@/constant/env';

import type { DirectusSchema } from '@/types/Directus';

if (!directusUrl && process.env.NODE_ENV !== 'test') {
  // eslint-disable-next-line no-console
  console.warn(
    '[directus] NEXT_PUBLIC_DIRECTUS_URL is not configured – API calls will fail.',
  );
}

/**
 * Server-side Directus client (uses the static admin/service token).
 * Use this from server components, route handlers, generateMetadata etc.
 */
export const directus = createDirectus<DirectusSchema>(directusUrl)
  .with(staticToken(directusApiToken))
  .with(rest({ credentials: 'omit' }));

/**
 * Public, client-side Directus client (no token attached).
 * Use this from client components – e.g. when initializing the Visual Editor
 * – so we never leak the static admin token to the browser.
 */
export const publicDirectus = createDirectus<DirectusSchema>(directusUrl)
  .with(authentication('json', { autoRefresh: false }))
  .with(rest({ credentials: 'include' }));

export default directus;
