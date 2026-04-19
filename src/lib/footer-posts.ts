import { fetchAPI } from '@/lib/fetch-api';

import type { News } from '@/types/News';

export type FooterPostsServerValue =
  | { kind: 'inactive' }
  | { kind: 'error' }
  | { kind: 'ready'; posts: News[] };

/**
 * Loads footer “recent posts” on the server (same flag + query as the former /api/posts flow).
 */
export async function loadFooterPosts(
  fetchFooterPostsEnabled: boolean,
): Promise<FooterPostsServerValue> {
  if (!fetchFooterPostsEnabled) {
    return { kind: 'inactive' };
  }

  try {
    const result = await fetchAPI<{ data: News[] | null }>(
      '/posts?sort=id:desc&populate=*&pagination[pageSize]=4',
    );
    return { kind: 'ready', posts: result.data ?? [] };
  } catch {
    return { kind: 'error' };
  }
}
