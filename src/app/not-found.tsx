import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import * as React from 'react';

export default async function RootNotFound() {
  const t = await getTranslations({ locale: 'de', namespace: 'notFound' });

  return (
    <html lang='de'>
      <body>
        <main style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>404 – {t('content.pageNotFound')}</h1>
          <Link href='/de'>{t('content.returnToHome')}</Link>
        </main>
      </body>
    </html>
  );
}
