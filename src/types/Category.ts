/**
 * Flattened category shape consumed by the templates.
 * Directus delivers these fields directly when populated via `fields`.
 */
export type Category = {
  id: number | string;
  name: string;
  slug: string;
};

/** @deprecated kept for backwards compatibility; use `Category`. */
export type CategoryData = Category;
