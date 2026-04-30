import { listPostSlugs } from '@/lib/posts';

import { i18nConfig } from '@/i18n/settings';

/** App routes under `[locale]`, with trailing slash (matches `trailingSlash: true`). */
const STATIC_PATHS: string[][] = [
  [],
  ['leistungen'],
  ['leistungen', 'produktion'],
  ['leistungen', 'vertrieb'],
  ['leistungen', 'reparatur'],
  ['unternehmen'],
  ['newsroom'],
  ['kontakt'],
  ['cookie-richtlinie'],
  ['impressum'],
  ['downloads'],
  ['agb'],
  ['datenschutz'],
];

export function localePath(locale: string, segments: string[]): string {
  if (segments.length === 0) {
    return `/${locale}/`;
  }
  return `/${locale}/${segments.join('/')}/`;
}

/**
 * Resolves all public URLs (pathnames) for the sitemap: static pages × locales
 * plus published news slugs × locales.
 */
export async function getSitemapPathnames(): Promise<string[]> {
  const slugs = await listPostSlugs();
  const pathnames: string[] = [];
  for (const locale of i18nConfig.locales) {
    for (const segments of STATIC_PATHS) {
      pathnames.push(localePath(locale, segments));
    }
    for (const slug of slugs) {
      pathnames.push(localePath(locale, ['newsroom', slug]));
    }
  }
  return pathnames;
}
