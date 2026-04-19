import type { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';
import '@c15t/nextjs/styles.css';

import { figtree, sortsMillGoudy } from '@/lib/fonts';

import { ConsentProvider } from '@/components/helpers/ConsentProvider';
import GoogleAnalytics from '@/components/helpers/GoogleAnalytics';
import Hotjar from '@/components/helpers/Hotjar';

import { googleAnalyticsId, hotjarId, isLocal } from '@/constant/env';

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
      <body className={isLocal ? 'debug-screens' : ''}>
        <ConsentProvider>
          {children}
          <GoogleAnalytics GA_MEASUREMENT_ID={googleAnalyticsId} />
          <Hotjar HOTJAR_ID={hotjarId} />
        </ConsentProvider>
      </body>
    </html>
  );
}
