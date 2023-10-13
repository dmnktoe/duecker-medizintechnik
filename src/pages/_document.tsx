import { Head, Html, Main, NextScript } from 'next/document';

import GoogleAnalytics from '@/components/layout/GoogleAnalytics';

import {
  cookieBotId,
  googleAnalyticsId,
  googleMapsApiKey,
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
        <script
          src={`https://maps.googleapis.com/maps/api/js?sensor=false&key=${googleMapsApiKey}&libraries=&v=weekly`}
          async
          type='text/plain'
          data-cookieconsent='marketing'
        ></script>
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
