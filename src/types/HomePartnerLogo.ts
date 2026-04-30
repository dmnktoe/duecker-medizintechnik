/**
 * Home hero: one Directus row can feed both the image slider and the partner logo strip.
 */
export type HomePartnerLogoItem = {
  id: string;
  /** Public URL (asset proxy when applicable). */
  logoUrl: string;
  alt: string;
  linkUrl: string | null;
  useInSlider: boolean;
  useInLogoStrip: boolean;
  /** From `directus_files.type` — used to choose `<img>` vs Next `<Image>` (SVG). */
  mimeType: string | null;
};
