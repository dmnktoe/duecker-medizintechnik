import type { Metadata } from 'next';

import { i18nConfig } from '@/i18n/settings';
import { getBaseUrl } from '@/lib/get-base-url';

export function getAlternates(
  path: string,
  _locale?: string,
): NonNullable<Metadata['alternates']> {
  const baseUrl = getBaseUrl();
  const { locales } = i18nConfig;

  const languages: Record<string, string> = {};
  locales.forEach((locale) => {
    languages[locale] = `${baseUrl}/${locale}${path}`;
  });

  return { languages };
}

export function getHreflangs(
  currentPath: string,
): { rel: string; hrefLang: string; href: string }[] {
  const baseUrl = getBaseUrl();
  return i18nConfig.locales.map((locale) => ({
    rel: 'alternate',
    hrefLang: locale,
    href: `${baseUrl}/${locale}${currentPath}`,
  }));
}
