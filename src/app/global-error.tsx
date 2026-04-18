'use client';

import * as Sentry from '@sentry/nextjs';
import { NextIntlClientProvider, useTranslations } from 'next-intl';
import * as React from 'react';
import { useEffect } from 'react';

import deMessages from '../../public/locales/de/common.json';

function ErrorContent({ reset }: { reset: () => void }) {
  const t = useTranslations('errors');
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>{t('title')}</h1>
      <button onClick={reset}>{t('retry')}</button>
    </main>
  );
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang='de'>
      <body>
        <NextIntlClientProvider locale='de' messages={deMessages}>
          <ErrorContent reset={reset} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
