import { createFlagsmithInstance } from 'flagsmith/isomorphic';
import { FlagsmithProvider } from 'flagsmith/react';
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import NextNProgress from 'nextjs-progressbar';
import React, { useRef } from 'react';

import '@/styles/globals.css';

import { figtree, sortsMillGoudy } from '@/lib/fonts';

import { flagsmithId } from '@/constant/env';

function Duecker({
  Component,
  pageProps,
  flagsmithState,
}: AppProps & { flagsmithState: never }) {
  const flagsmithRef = useRef(createFlagsmithInstance());
  return (
    <>
      <FlagsmithProvider
        flagsmith={flagsmithRef.current}
        serverState={flagsmithState}
      >
        <div className={`${figtree.variable} ${sortsMillGoudy.variable}`}>
          <NextNProgress
            color='var(--color-primary-500)'
            startPosition={0.3}
            stopDelayMs={200}
            height={2}
            showOnShallow={true}
            options={{
              showSpinner: false,
            }}
          />
          <Component {...pageProps} />
        </div>
      </FlagsmithProvider>
    </>
  );
}

Duecker.getInitialProps = async () => {
  const flagsmithSSR = createFlagsmithInstance();
  await flagsmithSSR.init({
    environmentID: flagsmithId ?? '',
  });
  return { flagsmithState: flagsmithSSR.getState() };
};

export default appWithTranslation(Duecker);
