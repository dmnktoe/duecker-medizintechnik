/* eslint-disable import/no-extraneous-dependencies */
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
  locale = DEFAULT_LOCALE.i18n.defaultLocale
) => {
  const resources: { [ns: string]: object } = {};

  // Load resources for the default language and given namespaces
  namespaces.forEach((ns) => {
    const filePath = `public/locales/${locale}/${ns}.json`;
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require,import/no-dynamic-require
      const translations = require(`../../${filePath}`);
      resources[ns] = translations;
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
