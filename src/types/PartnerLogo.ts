/**
 * Partner logos from Directus (`partners`): home logo strip + company marquee.
 */
export type PartnerLogoItem = {
  id: string;
  /** Public URL (asset proxy when applicable). */
  logoUrl: string;
  alt: string;
  linkUrl: string | null;
  /** From `directus_files.type` — `<img>` for SVG, Next `Image` for raster. */
  mimeType: string | null;
};
