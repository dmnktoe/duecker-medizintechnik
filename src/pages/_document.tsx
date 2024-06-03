import { Head, Html, Main, NextScript } from 'next/document';

import clsxm from '@/lib/clsxm';

import GoogleAnalytics from '@/components/helpers/GoogleAnalytics';
import Hotjar from '@/components/helpers/Hotjar';

import {
  cookieBotId,
  googleAnalyticsId,
  hotjarId,
  isLocal,
  isProd,
} from '@/constant/env';

export default function Document() {
  return (
    <Html suppressHydrationWarning>
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
        <Hotjar HOTJAR_ID={hotjarId} />
      </Head>
      <body
        className={clsxm(isLocal ? 'debug-screens' : '', 'overflow-x-hidden')}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
