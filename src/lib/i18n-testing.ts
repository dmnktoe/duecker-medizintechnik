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

  const Provider = NextIntlClientProvider as React.ComponentType<{
    locale: string;
    messages: Record<string, unknown>;
    children?: React.ReactNode;
  }>;
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(Provider, { locale, messages }, children);
};

export default createIntlWrapper;
