import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['de', 'en'],
  defaultLocale: 'de',
  // Rely on URL (and defaultLocale for unprefixed paths), not Accept-Language / cookie
  localeDetection: false,
});
