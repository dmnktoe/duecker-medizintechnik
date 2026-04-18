import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { i18nConfig } from '@/i18n/settings';

const initializeI18n = async (
  namespaces: string[],
  locale: string = i18nConfig.defaultLocale,
): Promise<typeof i18n> => {
  const resources: { [ns: string]: object } = {};

  namespaces.forEach((ns) => {
    const filePath = `public/locales/${locale}/${ns}.json`;
    try {
      resources[ns] = require(`../../${filePath}`);
    } catch {
      throw new Error(
        `Could not load translations for locale: ${locale}, namespace: ${ns}`,
      );
    }
  });

  await i18n.use(initReactI18next).init({
    lng: locale,
    fallbackLng: locale,
    debug: false,
    ns: namespaces,
    defaultNS: namespaces[0],
    resources: { [locale]: resources },
    interpolation: { escapeValue: false },
  });

  return i18n;
};

export default initializeI18n;
