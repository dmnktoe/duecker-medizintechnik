/**
 * Public-facing image shape (Directus file metadata projected into something
 * that templates can consume directly).
 */
export type DirectusImage = {
  /** Directus file id (UUID). */
  id: string;
  /** Public asset URL. May be empty if the file is missing. */
  url: string;
  /** Alternative text / accessible name. */
  alt: string;
  /** Width in pixels (if known). */
  width?: number | null;
  /** Height in pixels (if known). */
  height?: number | null;
};
