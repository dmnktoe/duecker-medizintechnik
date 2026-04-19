'use client';

import { useConsentManager } from '@c15t/nextjs';
import Script from 'next/script';
import * as React from 'react';

export default function GoogleAnalytics({
  GA_MEASUREMENT_ID,
}: {
  GA_MEASUREMENT_ID: string | undefined;
}) {
  const { has } = useConsentManager();
  const hasStats = has('measurement');

  if (!GA_MEASUREMENT_ID || !hasStats) return null;

  const encodedId = encodeURIComponent(GA_MEASUREMENT_ID);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodedId}`}
        strategy='afterInteractive'
      />
      <Script
        id='google-analytics'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${JSON.stringify(GA_MEASUREMENT_ID)}, {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
