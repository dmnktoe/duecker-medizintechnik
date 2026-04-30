import type { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';

import { sortsMillGoudy } from '@/lib/fonts';

import { isLocal } from '@/constant/env';

export const metadata: Metadata = {
  title:
    'Dücker Medizintechnik — Chirurgische Instrumente, Schlauchsysteme, Medizinprodukte',
  description:
    'Dücker Medizintechnik: Reparatur und Service chirurgischer Instrumente, Herstellung und Vertrieb steriler Schlauchsysteme sowie Medizinprodukte für Kliniken und die Industrie.',
  metadataBase: new URL('https://duecker-medizintechnik.de'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className={sortsMillGoudy.variable}>
      <body className={isLocal ? 'debug-screens' : ''}>{children}</body>
    </html>
  );
}
