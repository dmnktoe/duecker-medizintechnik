import type { Metadata } from 'next';

import { getBaseUrl } from '@/lib/get-base-url';

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

export type SitePageOgImage = {
  url: string | URL;
  width?: number;
  height?: number;
};

function ogApiUrl(title: string, description: string): string {
  const base = getBaseUrl().replace(/\/$/, '');
  const q = new URLSearchParams();
  q.set('title', title.slice(0, 140));
  q.set('description', (description || title).slice(0, 280));
  return `${base}/api/og?${q.toString()}`;
}

function ogImageUrlString(image: SitePageOgImage): string {
  const u = image.url;
  return typeof u === 'string' ? u : u.toString();
}

/**
 * Consistent document metadata: absolute title (no root `title.template` suffix),
 * Open Graph + Twitter card, default social image via `/api/og` unless overridden.
 */
export function sitePageMetadata(input: {
  title: string;
  description: string;
  alternates: NonNullable<Metadata['alternates']>;
  openGraphImages?: SitePageOgImage[];
}): Metadata {
  const { title, description, alternates, openGraphImages } = input;
  const desc = description.trim() || title;

  const images: SitePageOgImage[] =
    openGraphImages?.length && openGraphImages.length > 0
      ? openGraphImages
      : [{ url: ogApiUrl(title, desc), width: OG_WIDTH, height: OG_HEIGHT }];

  const primary = ogImageUrlString(images[0]);

  return {
    title: { absolute: title },
    description: desc,
    alternates,
    openGraph: {
      title,
      description: desc,
      type: 'website',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: [primary],
    },
  };
}
