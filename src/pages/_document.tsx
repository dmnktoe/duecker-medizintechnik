import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

import GoogleAnalytics from '@/components/helpers/GoogleAnalytics';
import Hotjar from '@/components/helpers/Hotjar';

import {
  cookieBotId,
  googleAnalyticsId,
  hotjarId,
  isLocal,
} from '@/constant/env';

export default function Document() {
  return (
    <Html suppressHydrationWarning>
      <Head>
        <Script
          id='Cookiebot'
          src='https://consent.cookiebot.eu/uc.js'
          data-cbid={cookieBotId}
          data-blockingmode='auto'
          type='text/javascript'
          strategy='beforeInteractive'
          async
        />
        <GoogleAnalytics GA_MEASUREMENT_ID={googleAnalyticsId} />
        <Hotjar HOTJAR_ID={hotjarId} />
      </Head>
      <body className={isLocal ? 'debug-screens' : ''}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
