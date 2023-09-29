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
          src='https://cmp.osano.com/AzZMywTrF2HBrUVGi/0c4834d3-c26e-4262-bfdf-4e2afee3d90c/osano.js'
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
