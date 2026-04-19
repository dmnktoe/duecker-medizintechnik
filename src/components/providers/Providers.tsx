'use client';

import { createFlagsmithInstance } from 'flagsmith/isomorphic';
import { FlagsmithProvider } from 'flagsmith/react';
import type { IState } from 'flagsmith/types';
import { NextIntlClientProvider } from 'next-intl';
import * as React from 'react';
import { useRef } from 'react';

import type { FooterPostsServerValue } from '@/lib/footer-posts';

import { FooterPostsProvider } from './FooterPostsContext';

type Props = {
  children: React.ReactNode;
  flagsmithState: IState;
  footerPosts: FooterPostsServerValue;
  locale: string;
  messages: Record<string, unknown>;
};

export function Providers({
  children,
  flagsmithState,
  footerPosts,
  locale,
  messages,
}: Props) {
  const flagsmithRef = useRef(createFlagsmithInstance());

  return (
    <FlagsmithProvider
      flagsmith={flagsmithRef.current}
      serverState={flagsmithState}
    >
      <FooterPostsProvider value={footerPosts}>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone='Europe/Berlin'
        >
          {children}
        </NextIntlClientProvider>
      </FooterPostsProvider>
    </FlagsmithProvider>
  );
}
