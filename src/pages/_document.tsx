import { Head, Html, Main, NextScript } from 'next/document';

import { isLocal } from '@/constant/env';
const GA_MEASUREMENT_ID = 'G-HNLHM0MQDN';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          id='Cookiebot'
          src='https://consent.cookiebot.com/uc.js'
          data-cbid='3722981a-3eb0-4ff9-9145-777cf50e6875'
          data-blockingmode='auto'
          type='text/javascript'
        ></script>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          data-cookieconsent='analytics'
        />
        <script id='google-analytics' data-cookieconsent='analytics'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </script>
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
