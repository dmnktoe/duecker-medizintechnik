import { Head, Html, Main, NextScript } from 'next/document';

import GoogleAnalytics from '@/components/layout/GoogleAnalytics';

import {
  cookieBotId,
  googleAnalyticsId,
  isLocal,
  isProd,
} from '@/constant/env';

export default function Document() {
  return (
    <Html>
      <Head>
        {isProd && (
          <script
            id='Cookiebot'
            src='https://consent.cookiebot.com/uc.js'
            data-cbid={cookieBotId}
            async
            type='text/javascript'
          ></script>
        )}
        <GoogleAnalytics GA_MEASUREMENT_ID={googleAnalyticsId} />
        <link
          rel='preload'
          href='/fonts/manrope-var-wght.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
      </Head>
      <body className={isLocal ? 'debug-screens' : ''}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
