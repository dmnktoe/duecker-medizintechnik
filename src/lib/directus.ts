import {
  authentication,
  createDirectus,
  rest,
  staticToken,
} from '@directus/sdk';

import { assertDirectusEnv } from '@/lib/env-assertions';

import { directusApiToken, directusUrl } from '@/constant/env';

import type { DirectusSchema } from '@/types/Directus';

assertDirectusEnv();

/**
 * Strip trailing slashes – `createDirectus` concatenates the base URL with the
 * SDK endpoint paths verbatim, so `https://admin.example.com/` would generate
 * `https://admin.example.com//items/posts` and 404 in some setups.
 */
const baseUrl = (directusUrl ?? '').replace(/\/+$/, '');

/**
 * Server-side Directus client (uses the static admin/service token).
 * Use this from server components, route handlers, generateMetadata etc.
 *
 * `next: { revalidate: 60 }` – matches the previous Strapi caching policy
 * and keeps revalidation centralised on the server.
 */
export const directus = createDirectus<DirectusSchema>(baseUrl)
  .with(staticToken(directusApiToken))
  .with(
    rest({
      credentials: 'omit',
      onRequest: (options) => ({
        ...options,
        next: { revalidate: 60, ...(options as { next?: object }).next },
      }),
    }),
  );

/**
 * Public, client-side Directus client (no token attached).
 * Use this from client components – e.g. when initializing the Visual Editor
 * – so we never leak the static admin token to the browser.
 */
export const publicDirectus = createDirectus<DirectusSchema>(baseUrl)
  .with(authentication('json', { autoRefresh: false }))
  .with(rest({ credentials: 'include' }));

export default directus;
