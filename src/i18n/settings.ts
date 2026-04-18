export const i18nConfig = {
  defaultLocale: 'de' as const,
  locales: ['de', 'en'] as const,
};

export type Locale = (typeof i18nConfig.locales)[number];

export const ALL_NAMESPACES = [
  'common',
  'company',
  'contact',
  'cookiePolicy',
  'distribution',
  'downloads',
  'home',
  'imprint',
  'news',
  'notFound',
  'privacy',
  'production',
  'repair',
  'services',
  'termsAndConditions',
] as const;
