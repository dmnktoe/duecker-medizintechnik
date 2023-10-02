import { Head, Html, Main, NextScript } from 'next/document';

import GoogleAnalytics from '@/components/layout/GoogleAnalytics';

import { isLocal } from '@/constant/env';
const GA_MEASUREMENT_ID = 'G-HNLHM0MQDN';

export default function Document() {
  return (
    <Html>
      <Head>
        {process.env.NODE_ENV == 'production' && (
          // eslint-disable-next-line @next/next/no-sync-scripts
          <script
            id='Cookiebot'
            src='https://consent.cookiebot.com/uc.js'
            data-cbid='3722981a-3eb0-4ff9-9145-777cf50e6875'
            async
            type='text/javascript'
          ></script>
        )}
        <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
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
