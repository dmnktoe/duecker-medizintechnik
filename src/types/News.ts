import type { Author } from '@/types/Author';
import type { Category } from '@/types/Category';
import type { DirectusImage } from '@/types/Image';

/**
 * A blog/news post as consumed by the frontend after we project the raw
 * Directus shape into a flat structure (see `mapPost` in `@/lib/posts`).
 */
export type News = {
  id: number | string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  date_published: string;
  date_created?: string | null;
  date_updated?: string | null;
  status: 'published' | 'draft' | 'archived';
  image?: DirectusImage | null;
  category?: Category | null;
  author?: Author | null;
};
