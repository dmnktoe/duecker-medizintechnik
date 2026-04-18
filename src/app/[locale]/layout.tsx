import { createFlagsmithInstance } from 'flagsmith/isomorphic';
import * as React from 'react';

import { Providers } from '@/components/providers/Providers';
import { flagsmithId } from '@/constant/env';
import { ALL_NAMESPACES, i18nConfig } from '@/i18n/settings';
import { loadTranslations } from '@/i18n/server';

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const flagsmithSSR = createFlagsmithInstance();
  await flagsmithSSR.init({ environmentID: flagsmithId ?? '' });
  const flagsmithState = flagsmithSSR.getState();

  const translations = await loadTranslations(locale, ALL_NAMESPACES);

  return (
    <Providers
      locale={locale}
      translations={translations}
      flagsmithState={flagsmithState}
    >
      {children}
    </Providers>
  );
}
