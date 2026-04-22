/**
 * Schema definition for Directus collections used by this project.
 *
 * Field names follow the Directus convention of `snake_case`. Adjust them in
 * Directus' Data Studio if you prefer different casing – just make sure the
 * names match between Directus and this file.
 */

export type DirectusFile = {
  id: string;
  storage?: string;
  filename_disk?: string | null;
  filename_download?: string | null;
  title?: string | null;
  type?: string | null;
  description?: string | null;
  filesize?: number | string | null;
  width?: number | null;
  height?: number | null;
  uploaded_on?: string | null;
};

export type DirectusUser = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  avatar?: DirectusFile | string | null;
};

export type Status = 'published' | 'draft' | 'archived';

/* ---------------------- Collection: categories ---------------------- */

export type Category = {
  id: number | string;
  status: Status;
  date_created?: string | null;
  date_updated?: string | null;
  name: string;
  slug: string;
};

/* --------------------------- Collection: authors -------------------- */

export type Author = {
  id: number | string;
  status: Status;
  date_created?: string | null;
  date_updated?: string | null;
  name: string;
  bio?: string | null;
  mail?: string | null;
  image?: DirectusFile | string | null;
};

/* --------------------------- Collection: posts ---------------------- */

export type Post = {
  id: number | string;
  status: Status;
  date_created?: string | null;
  date_updated?: string | null;
  date_published?: string | null;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: DirectusFile | string | null;
  category?: Category | number | string | null;
  author?: Author | number | string | null;
};

/* ------------------------ Collection: download_categories ----------- */

export type DownloadCategory = {
  id: number | string;
  status: Status;
  name: string;
  slug?: string | null;
  sort?: number | null;
};

/* ------------------------ Collection: downloads --------------------- */

export type DownloadFileJunction = {
  id: number | string;
  downloads_id?: number | string | null;
  directus_files_id?: DirectusFile | string | null;
};

export type Download = {
  id: number | string;
  status: Status;
  date_created?: string | null;
  date_updated?: string | null;
  name: string;
  category?: DownloadCategory | number | string | null;
  /**
   * Many-to-many relation to `directus_files`. In Directus this is exposed as
   * an array of junction rows. `directus_files_id` is the actual file.
   */
  files?: DownloadFileJunction[] | null;
  /** Optional locale code, e.g. `de` / `en`. */
  locale?: string | null;
};

/* ----------------------- Top-level Directus schema ------------------ */

export type DirectusSchema = {
  posts: Post[];
  authors: Author[];
  categories: Category[];
  downloads: Download[];
  download_categories: DownloadCategory[];
};
