import { getBaseUrl } from '@/lib/get-base-url';

import i18nextConfig from '../../next-i18next.config';

const generateHreflangTags = (locales: string[], currentPath: string) => {
  const baseUrl = getBaseUrl();
  return locales.map((locale) => ({
    rel: 'alternate',
    hrefLang: locale,
    href:
      locale === 'de'
        ? `${baseUrl}${currentPath}`
        : `${baseUrl}/${locale}${currentPath}`,
  }));
};

const getHreflangs = (currentPath: string) => {
  const { locales } = i18nextConfig.i18n;
  return generateHreflangTags(locales, currentPath);
};

export { generateHreflangTags, getHreflangs };
