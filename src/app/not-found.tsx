import * as React from 'react';

export default function RootNotFound() {
  return (
    <html lang='de'>
      <body>
        <main style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>404 – Seite nicht gefunden</h1>
          <a href='/de'>Zurück zur Startseite</a>
        </main>
      </body>
    </html>
  );
}
