'use client';

import * as React from 'react';

import type { FooterPostsServerValue } from '@/lib/footer-posts';

const FooterPostsContext = React.createContext<
  FooterPostsServerValue | undefined
>(undefined);

type FooterPostsProviderProps = {
  value: FooterPostsServerValue;
  children: React.ReactNode;
};

export function FooterPostsProvider({
  value,
  children,
}: FooterPostsProviderProps) {
  return (
    <FooterPostsContext.Provider value={value}>
      {children}
    </FooterPostsContext.Provider>
  );
}

export function useFooterPosts(): FooterPostsServerValue {
  const ctx = React.useContext(FooterPostsContext);
  if (ctx === undefined) {
    throw new Error('useFooterPosts must be used within FooterPostsProvider');
  }
  return ctx;
}
