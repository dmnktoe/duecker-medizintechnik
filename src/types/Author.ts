import type { DirectusImage } from '@/types/Image';

export type Author = {
  id: number | string;
  name: string;
  bio?: string | null;
  mail?: string | null;
  image?: DirectusImage | null;
};

/** @deprecated kept for backwards compatibility; use `Author`. */
export type AuthorData = Author;
