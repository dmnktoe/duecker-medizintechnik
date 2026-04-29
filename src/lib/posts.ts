import { formatFields, readItem, readItems } from '@directus/sdk';
import { draftMode } from 'next/headers';
import { cache } from 'react';

import { directus } from '@/lib/directus';
import {
  formatDirectusClientError,
  logDirectusError,
} from '@/lib/directus-logging';
import { getDirectusAssetUrl } from '@/lib/directus-urls';

import type {
  Author as DirectusAuthor,
  Category as DirectusCategory,
  DirectusFile,
  Post as DirectusPost,
} from '@/types/Directus';
import type { DirectusImage } from '@/types/Image';
import type { News } from '@/types/News';

/** Nested field trees → single `fields=` string (avoids invalid top-level columns). */
const POST_FIELD_TREES = [
  'id',
  'status',
  'date_created',
  'date_updated',
  'date_published',
  'title',
  'slug',
  'excerpt',
  'content',
  { image: ['id', 'title', 'description', 'width', 'height'] },
  { category: ['id', 'name', 'slug'] },
  {
    author: [
      'id',
      'name',
      'bio',
      'mail',
      { image: ['id', 'title', 'description', 'width', 'height'] },
    ],
  },
] as const;

const POST_FIELDS = formatFields([...POST_FIELD_TREES]).join(',');

function mapImage(file?: DirectusFile | string | null): DirectusImage | null {
  if (!file) return null;
  if (typeof file === 'string') {
    return {
      id: file,
      url: getDirectusAssetUrl(file),
      alt: '',
    };
  }
  return {
    id: file.id,
    url: getDirectusAssetUrl(file),
    alt: file.description ?? file.title ?? file.filename_download ?? '',
    width: file.width ?? null,
    height: file.height ?? null,
  };
}

function mapCategory(
  category: DirectusCategory | number | string | null | undefined,
): News['category'] {
  if (!category || typeof category !== 'object') return null;
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
  };
}

function mapAuthor(
  author: DirectusAuthor | number | string | null | undefined,
): News['author'] {
  if (!author || typeof author !== 'object') return null;
  return {
    id: author.id,
    name: author.name,
    bio: author.bio ?? null,
    mail: author.mail ?? null,
    image: mapImage(author.image),
  };
}

export function mapPost(post: DirectusPost): News {
  return {
    id: post.id,
    title: post.title,
    excerpt: post.excerpt ?? '',
    content: post.content ?? '',
    slug: post.slug,
    status: post.status,
    date_published: post.date_published ?? post.date_created ?? '',
    date_created: post.date_created ?? null,
    date_updated: post.date_updated ?? null,
    image: mapImage(post.image),
    category: mapCategory(post.category),
    author: mapAuthor(post.author),
  };
}

async function isDraftEnabled(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    return false;
  }
}

type ListPostsQuery = {
  limit?: number;
  sort?: string[];
  /**
   * When true, do not restrict to `status = published` (still respects draft
   * mode: with draft enabled, the filter is already off). Use for local
   * debugging when items are still draft.
   */
  includeAllStatuses?: boolean;
};

export type ListPostsOutcome =
  | { ok: true; posts: News[] }
  | {
      ok: false;
      posts: [];
      error: ReturnType<typeof formatDirectusClientError>;
    };

function postsStatusFilter(
  draft: boolean,
  includeAllStatuses: boolean | undefined,
) {
  if (draft || includeAllStatuses) return undefined;
  return { status: { _eq: 'published' as const } };
}

/**
 * Loads news posts from Directus. By default returns only published items
 * (unless draft mode is on). Pass `{ withOutcome: true }` when you need error
 * detail instead of an empty array on failure (e.g. `/api/posts`).
 */
export async function listPosts(
  options: ListPostsQuery & { withOutcome: true },
): Promise<ListPostsOutcome>;
export async function listPosts(options?: ListPostsQuery): Promise<News[]>;
export async function listPosts(
  options: ListPostsQuery & { withOutcome?: boolean } = {},
): Promise<News[] | ListPostsOutcome> {
  const {
    withOutcome,
    limit,
    sort = ['-date_published', '-id'],
    includeAllStatuses,
  } = options;
  const draft = await isDraftEnabled();
  try {
    const items = (await directus.request(
      readItems('posts', {
        fields: POST_FIELDS as never,
        sort: sort as never,
        limit,
        filter: postsStatusFilter(draft, includeAllStatuses),
      }),
    )) as unknown as DirectusPost[];
    const posts = items.map(mapPost);
    if (withOutcome) return { ok: true, posts };
    return posts;
  } catch (error) {
    logDirectusError('listPosts', error, {
      limit,
      draft,
      includeAllStatuses,
    });
    if (withOutcome) {
      return { ok: false, posts: [], error: formatDirectusClientError(error) };
    }
    return [];
  }
}

export const getPostBySlug = cache(
  async (slug: string): Promise<News | null> => {
    const draft = await isDraftEnabled();
    try {
      const items = (await directus.request(
        readItems('posts', {
          fields: POST_FIELDS as never,
          limit: 1,
          filter: {
            slug: { _eq: slug },
            ...(draft ? {} : { status: { _eq: 'published' } }),
          },
        }),
      )) as unknown as DirectusPost[];
      return items[0] ? mapPost(items[0]) : null;
    } catch (error) {
      logDirectusError('getPostBySlug', error, { slug, draft });
      return null;
    }
  },
);

export async function getPostById(id: number | string): Promise<News | null> {
  try {
    const item = (await directus.request(
      readItem('posts', id as string, {
        fields: POST_FIELDS as never,
      }),
    )) as unknown as DirectusPost;
    return item ? mapPost(item) : null;
  } catch (error) {
    logDirectusError('getPostById', error, { id });
    return null;
  }
}

export async function listPostSlugs(): Promise<string[]> {
  try {
    const items = (await directus.request(
      readItems('posts', {
        fields: 'slug' as never,
        filter: { status: { _eq: 'published' } },
        limit: -1,
      }),
    )) as unknown as Pick<DirectusPost, 'slug'>[];
    return items.map((p) => p.slug).filter(Boolean);
  } catch (error) {
    logDirectusError('listPostSlugs', error, {});
    return [];
  }
}
