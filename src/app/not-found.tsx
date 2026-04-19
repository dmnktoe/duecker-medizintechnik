import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import * as React from 'react';

// Omit `<html>`/`<body>` so `app/layout.tsx` applies (Next.js 15.2+).
export default async function RootNotFound() {
  const t = await getTranslations({ locale: 'de', namespace: 'notFound' });

  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>404 – {t('content.pageNotFound')}</h1>
      <Link href='/de'>{t('content.returnToHome')}</Link>
    </main>
  );
}
