import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

import { isLocal } from '@/constant/env';
const GA_MEASUREMENT_ID = 'G-HNLHM0MQDN';

export default function Document() {
  return (
    <Html>
      <Head>
        <Script
          id='Cookiebot'
          src='https://consent.cookiebot.com/uc.js'
          data-cbid='3722981a-3eb0-4ff9-9145-777cf50e6875'
          type='text/javascript'
          async
          strategy='beforeInteractive'
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy='afterInteractive'
        />
        <Script id='google-analytics' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
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
