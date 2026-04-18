import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

const createIntlWrapper = async (
  namespaces: string[],
  locale: string = 'de',
): Promise<React.ComponentType<{ children: React.ReactNode }>> => {
  const messages: Record<string, unknown> = {};

  for (const ns of namespaces) {
    const filePath = `public/locales/${locale}/${ns}.json`;
    try {
      messages[ns] = require(`../../${filePath}`);
    } catch {
      throw new Error(
        `Could not load translations for locale: ${locale}, namespace: ${ns}`,
      );
    }
  }

  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(NextIntlClientProvider, { locale, messages }, children);
};

export default createIntlWrapper;
