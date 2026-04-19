import type { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';

import { figtree, sortsMillGoudy } from '@/lib/fonts';

import { isLocal } from '@/constant/env';

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
      <body className={isLocal ? 'debug-screens' : ''}>{children}</body>
    </html>
  );
}
