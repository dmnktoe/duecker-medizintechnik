import { Head, Html, Main, NextScript } from 'next/document';

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
        <script
          id='Cookiebot'
          src='https://consent.cookiebot.com/uc.js'
          data-cbid={cookieBotId}
          async
          type='text/javascript'
        ></script>
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
