'use client';

import { useConsentManager } from '@c15t/nextjs';
import Script from 'next/script';
import * as React from 'react';

export default function Hotjar({
  HOTJAR_ID,
}: {
  HOTJAR_ID: string | undefined;
}) {
  const { has } = useConsentManager();
  const hasStats = has('measurement');

  if (!HOTJAR_ID || !hasStats) return null;

  return (
    <Script
      id='hotjar'
      strategy='afterInteractive'
      dangerouslySetInnerHTML={{
        __html: `
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:${JSON.stringify(HOTJAR_ID)},hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `,
      }}
    />
  );
}
