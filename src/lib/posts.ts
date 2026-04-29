import { readFiles, readItem, readItems } from '@directus/sdk';
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

const POST_ROW_FIELDS = [
  'id',
  'status',
  'date_created',
  'date_updated',
  'date_published',
  'title',
  'slug',
  'excerpt',
  'content',
  'image',
  'category',
  'author',
].join(',');

const FILE_FIELDS = [
  'id',
  'title',
  'description',
  'width',
  'height',
  'filename_download',
].join(',');

async function hydratePostsFromRows(
  rows: DirectusPost[],
): Promise<DirectusPost[]> {
  if (rows.length === 0) return rows;

  const categoryIds = [
    ...new Set(
      rows
        .map((r) => r.category)
        .filter((c): c is string | number => c != null && typeof c !== 'object')
        .map(String),
    ),
  ];
  const authorIds = [
    ...new Set(
      rows
        .map((r) => r.author)
        .filter((a): a is string | number => a != null && typeof a !== 'object')
        .map(String),
    ),
  ];

  const [categories, authors] = await Promise.all([
    categoryIds.length
      ? ((await directus.request(
          readItems('categories', {
            filter: { id: { _in: categoryIds as never } },
            fields: ['id', 'name', 'slug'] as never,
            limit: -1,
          }),
        )) as unknown as DirectusCategory[])
      : [],
    authorIds.length
      ? ((await directus.request(
          readItems('authors', {
            filter: { id: { _in: authorIds as never } },
            fields: ['id', 'name', 'bio', 'mail', 'image'] as never,
            limit: -1,
          }),
        )) as unknown as DirectusAuthor[])
      : [],
  ]);

  const catById = new Map(categories.map((c) => [String(c.id), c]));

  const fileIds = new Set<string>();
  for (const r of rows) {
    if (typeof r.image === 'string' && r.image) fileIds.add(r.image);
  }
  for (const a of authors) {
    if (typeof a.image === 'string' && a.image) fileIds.add(a.image);
  }

  const filesById = new Map<string, DirectusFile>();
  if (fileIds.size > 0) {
    const ids = Array.from(fileIds) as never;
    const files = (await directus.request(
      readFiles({
        filter: { id: { _in: ids } },
        fields: FILE_FIELDS as never,
        limit: -1,
      }),
    )) as unknown as DirectusFile[];
    for (const f of files) filesById.set(f.id, f);
  }

  const authorsHydrated: DirectusAuthor[] = authors.map((a) => ({
    ...a,
    image:
      typeof a.image === 'string' && filesById.has(a.image)
        ? filesById.get(a.image)!
        : a.image,
  }));
  const authById = new Map(authorsHydrated.map((a) => [String(a.id), a]));

  return rows.map((r) => {
    const cid =
      r.category != null && typeof r.category !== 'object'
        ? String(r.category)
        : null;
    const aid =
      r.author != null && typeof r.author !== 'object'
        ? String(r.author)
        : null;
    const category =
      cid && catById.has(cid)
        ? (catById.get(cid) as DirectusCategory)
        : r.category;
    const author =
      aid && authById.has(aid)
        ? (authById.get(aid) as DirectusAuthor)
        : r.author;
    const image =
      typeof r.image === 'string' && filesById.has(r.image)
        ? filesById.get(r.image)!
        : r.image;
    return { ...r, category, author, image } as DirectusPost;
  });
}

async function readPostsList(query: {
  filter?: object;
  sort?: string[];
  limit?: number;
}): Promise<DirectusPost[]> {
  const rows = (await directus.request(
    readItems('posts', {
      ...query,
      fields: POST_ROW_FIELDS as never,
      sort: query.sort as never,
    }),
  )) as unknown as DirectusPost[];
  return hydratePostsFromRows(rows);
}

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
  const filter = postsStatusFilter(draft, includeAllStatuses);
  try {
    const items = await readPostsList({ filter, sort, limit });
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
    const filter = {
      slug: { _eq: slug },
      ...(draft ? {} : { status: { _eq: 'published' as const } }),
    };
    try {
      const rows = (await directus.request(
        readItems('posts', {
          fields: POST_ROW_FIELDS as never,
          limit: 1,
          filter,
        }),
      )) as unknown as DirectusPost[];
      const items = await hydratePostsFromRows(rows);
      return items[0] ? mapPost(items[0]) : null;
    } catch (error) {
      logDirectusError('getPostBySlug', error, { slug, draft });
      return null;
    }
  },
);

export async function getPostById(id: number | string): Promise<News | null> {
  try {
    const row = (await directus.request(
      readItem('posts', id as string, {
        fields: POST_ROW_FIELDS as never,
      }),
    )) as unknown as DirectusPost;
    const [item] = await hydratePostsFromRows([row]);
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
        fields: ['id', 'slug'] as never,
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
