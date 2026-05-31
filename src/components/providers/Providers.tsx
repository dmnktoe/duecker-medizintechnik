'use client';

import { NextIntlClientProvider } from 'next-intl';
import * as React from 'react';

import type { FooterPostsServerValue } from '@/lib/footer-posts';

import { FooterPostsProvider } from './FooterPostsContext';

type Props = {
  children: React.ReactNode;
  footerPosts: FooterPostsServerValue;
  locale: string;
  messages: Record<string, unknown>;
};

export function Providers({ children, footerPosts, locale, messages }: Props) {
  return (
    <FooterPostsProvider value={footerPosts}>
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone='Europe/Berlin'
      >
        {children}
      </NextIntlClientProvider>
    </FooterPostsProvider>
  );
}
