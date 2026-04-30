import type { MetadataRoute } from 'next';

import { getBaseUrl } from '@/lib/get-base-url';

export default function robots(): MetadataRoute.Robots {
  const base = getBaseUrl();
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: new URL('sitemap.xml', `${base}/`).toString(),
  };
}
