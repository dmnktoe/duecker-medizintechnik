import { listPosts } from '@/lib/posts';

import type { News } from '@/types/News';

export type FooterPostsServerValue =
  | { kind: 'inactive' }
  | { kind: 'error' }
  | { kind: 'ready'; posts: News[] };

/**
 * Loads footer "recent posts" on the server. Mirrors the previous Strapi
 * variant (`/posts?sort=id:desc&populate=*&pagination[pageSize]=4`) but uses
 * the new Directus client.
 */
export async function loadFooterPosts(
  fetchFooterPostsEnabled: boolean,
): Promise<FooterPostsServerValue> {
  if (!fetchFooterPostsEnabled) {
    return { kind: 'inactive' };
  }

  try {
    const posts = await listPosts({ limit: 4 });
    return { kind: 'ready', posts };
  } catch {
    return { kind: 'error' };
  }
}
