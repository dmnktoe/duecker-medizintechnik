import type { Metadata } from 'next';
import Script from 'next/script';
import * as React from 'react';

import '@/styles/globals.css';

import { figtree, sortsMillGoudy } from '@/lib/fonts';

import GoogleAnalytics from '@/components/helpers/GoogleAnalytics';
import Hotjar from '@/components/helpers/Hotjar';

import {
  cookieBotId,
  googleAnalyticsId,
  hotjarId,
  isLocal,
} from '@/constant/env';

export const metadata: Metadata = {
  title: {
    default: 'Dücker Medizintechnik',
    template: '%s | Dücker Medizintechnik',
  },
  description:
    'Dücker Medizintechnik ist Ihr Partner für OP-Lösungen und Sterilisierungen.',
  metadataBase: new URL('https://www.duecker-medizintechnik.de'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${figtree.variable} ${sortsMillGoudy.variable}`}
    >
      <head>
        <Script
          id='Cookiebot'
          src='https://consent.cookiebot.eu/uc.js'
          data-cbid={cookieBotId}
          type='text/javascript'
          strategy='beforeInteractive'
          async
        />
        <GoogleAnalytics GA_MEASUREMENT_ID={googleAnalyticsId} />
        <Hotjar HOTJAR_ID={hotjarId} />
      </head>
      <body className={isLocal ? 'debug-screens' : ''}>{children}</body>
    </html>
  );
}
