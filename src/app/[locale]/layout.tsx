import { createFlagsmithInstance } from 'flagsmith/isomorphic';
import { getMessages } from 'next-intl/server';
import * as React from 'react';

import { Providers } from '@/components/providers/Providers';
import { flagsmithId } from '@/constant/env';
import { i18nConfig } from '@/i18n/settings';

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

  const messages = await getMessages();

  return (
    <Providers
      locale={locale}
      messages={messages}
      flagsmithState={flagsmithState}
    >
      {children}
    </Providers>
  );
}
