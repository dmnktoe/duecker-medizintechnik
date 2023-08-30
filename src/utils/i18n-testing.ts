import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import * as DEFAULT_LOCALE from './../../next-i18next.config';

/**
 * Initializes the i18n instance with the given namespaces.
 * @param {string[]} namespaces - An array of namespaces.
 * @param {string} locale - The locale to use.
 * @returns {i18n.i18n} The initialized i18n instance.
 */

const initializeI18n = async (
  namespaces: string[],
  locale: string = DEFAULT_LOCALE.i18n.defaultLocale
): Promise<typeof i18n> => {
  const resources: { [ns: string]: object } = {};

  namespaces.forEach((ns) => {
    const filePath = `public/locales/${locale}/${ns}.json`;
    try {
      resources[ns] = require(`../../${filePath}`);
    } catch (error) {
      throw new Error(
        `Could not load translations for locale: ${locale}, namespace: ${ns}`
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
