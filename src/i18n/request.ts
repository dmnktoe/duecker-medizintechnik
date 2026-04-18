import { getRequestConfig } from 'next-intl/server';

import { ALL_NAMESPACES } from './settings';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale;
  }

  const messages: Record<string, unknown> = {};
  for (const ns of ALL_NAMESPACES) {
    try {
      messages[ns] = (
        await import(`../../public/locales/${locale}/${ns}.json`)
      ).default;
    } catch {
      messages[ns] = {};
    }
  }

  return { locale, messages };
});
