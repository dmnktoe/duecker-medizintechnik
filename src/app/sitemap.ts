import type { MetadataRoute } from 'next';

import { getBaseUrl } from '@/lib/get-base-url';
import { getSitemapPathnames } from '@/lib/sitemap-paths';

export const revalidate = 3_600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseUrl();
  const pathnames = await getSitemapPathnames();
  return pathnames.map((path) => ({
    url: new URL(path, `${base}/`).toString(),
  }));
}
