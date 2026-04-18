'use client';

import * as Sentry from '@sentry/nextjs';
import * as React from 'react';
import { useEffect } from 'react';

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
        <main style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Etwas ist schiefgelaufen</h1>
          <button onClick={reset}>Erneut versuchen</button>
        </main>
      </body>
    </html>
  );
}
