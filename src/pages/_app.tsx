import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import NextNProgress from 'nextjs-progressbar';
import React from 'react';

import '@/styles/globals.css';

function Duecker({ Component, pageProps }: AppProps) {
  return (
    <>
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
    </>
  );
}

export default appWithTranslation(Duecker);
