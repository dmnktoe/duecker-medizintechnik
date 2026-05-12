import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import * as React from 'react';

import {
  getFlagsmithServerState,
  hasServerFeature,
} from '@/lib/flagsmith-server';
import { loadFooterPosts } from '@/lib/footer-posts';

import { ConsentProvider } from '@/components/helpers/ConsentProvider';
import GoogleAnalytics from '@/components/helpers/GoogleAnalytics';
import Hotjar from '@/components/helpers/Hotjar';
import { Providers } from '@/components/providers/Providers';
import { VisualEditorMount } from '@/components/providers/VisualEditorMount';

import { googleAnalyticsId, hotjarId } from '@/constants/env';
import { routing } from '@/i18n/routing';
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

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const [flagsmithState, fetchFooterPostsEnabled] = await Promise.all([
    getFlagsmithServerState(),
    hasServerFeature('fetch_footer_posts'),
  ]);

  const footerPosts = await loadFooterPosts(fetchFooterPostsEnabled);

  const messages = await getMessages();
  const { isEnabled: isDraft } = await draftMode();

  return (
    <Providers
      footerPosts={footerPosts}
      locale={locale}
      messages={messages}
      flagsmithState={flagsmithState}
    >
      <ConsentProvider locale={locale}>
        {children}
        <GoogleAnalytics GA_MEASUREMENT_ID={googleAnalyticsId} />
        <Hotjar HOTJAR_ID={hotjarId} />
        <VisualEditorMount enabled={isDraft} />
      </ConsentProvider>
    </Providers>
  );
}
