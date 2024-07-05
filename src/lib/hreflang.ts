import { getBaseUrl } from '@/lib/get-base-url';

export const generateHreflangTags = (
  locales: string[],
  currentPath: string,
) => {
  const baseUrl = getBaseUrl();
  return locales.map((locale) => {
    // Check if the locale is the default one (e.g., 'de')
    const href =
      locale === 'de'
        ? baseUrl + currentPath
        : `${baseUrl}/${locale}${currentPath}`;
    return {
      rel: 'alternate',
      hrefLang: locale,
      href,
    };
  });
};
