import { readItem, readItems } from '@directus/sdk';
import { draftMode } from 'next/headers';
import { cache } from 'react';

import { directus } from '@/lib/directus';
import { logDirectusError } from '@/lib/directus-logging';
import { getDirectusAssetUrl } from '@/lib/directus-urls';

import type {
  Author as DirectusAuthor,
  Category as DirectusCategory,
  DirectusFile,
  Post as DirectusPost,
} from '@/types/Directus';
import type { DirectusImage } from '@/types/Image';
import type { News } from '@/types/News';

const POST_FIELDS = [
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
];

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

type ListPostsOptions = {
  limit?: number;
  sort?: string[];
};

export async function listPosts({
  limit,
  sort = ['-date_published', '-id'],
}: ListPostsOptions = {}): Promise<News[]> {
  const draft = await isDraftEnabled();
  try {
    const items = (await directus.request(
      readItems('posts', {
        fields: POST_FIELDS as never,
        sort: sort as never,
        limit,
        filter: draft ? undefined : { status: { _eq: 'published' } },
      }),
    )) as unknown as DirectusPost[];
    return items.map(mapPost);
  } catch (error) {
    logDirectusError('listPosts', error, { limit, draft });
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
        fields: ['slug'],
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
