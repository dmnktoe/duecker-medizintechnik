import { datadogRum } from '@datadog/browser-rum';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { createFlagsmithInstance } from 'flagsmith/isomorphic';
import { FlagsmithProvider } from 'flagsmith/react';
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import NextNProgress from 'nextjs-progressbar';
import React, { useRef } from 'react';

import '@/styles/globals.css';

import { figtree, sortsMillGoudy } from '@/lib/fonts';
import { getVersion } from '@/lib/get-version';

import {
  datadogApplicationId,
  datadogClientToken,
  flagsmithId,
} from '@/constant/env';

datadogRum.init({
  applicationId: datadogApplicationId ?? '',
  clientToken: datadogClientToken ?? '',
  site: 'datadoghq.eu',
  service: 'duecker-medizintechnik',
  env: process.env.NODE_ENV,
  version: getVersion(),
  sessionSampleRate: 100,
  sessionReplaySampleRate: 20,
  trackUserInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: 'mask-user-input',
});

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
      <SpeedInsights />
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
