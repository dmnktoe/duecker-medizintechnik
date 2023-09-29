import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

import { isLocal } from '@/constant/env';

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel='preload'
          href='/fonts/manrope-var-wght.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
        <Script
          src='https://cdn-cookieyes.com/client_data/c6cd7ed9757924c114c7a9e4/script.js'
          strategy='beforeInteractive'
        />
      </Head>
      <body className={isLocal ? 'debug-screens' : ''}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
