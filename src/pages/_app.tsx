import { AppProps } from 'next/app';
import { Figtree, Sorts_Mill_Goudy } from 'next/font/google';
import { appWithTranslation } from 'next-i18next';
import NextNProgress from 'nextjs-progressbar';
import React from 'react';

import '@/styles/globals.css';

const figtree = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-figtree',
});

const sortsMillGoudy = Sorts_Mill_Goudy({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sortsMillGoudy',
  weight: ['400'],
});

function Duecker({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className={`${figtree.variable} ${sortsMillGoudy.variable}`}>
        <NextNProgress
          color='var(--color-primary-500)'
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
          options={{
            showSpinner: false,
          }}
        />
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default appWithTranslation(Duecker);
