import { listPosts } from '@/lib/posts';

import type { News } from '@/types/News';

export type FooterPostsServerValue =
  | { kind: 'inactive' }
  | { kind: 'error' }
  | { kind: 'ready'; posts: News[] };

/** Loads recent posts for the footer when the feature flag is enabled. */
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
