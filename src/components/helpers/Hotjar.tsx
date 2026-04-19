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

  React.useEffect(() => {
    if (hasStats || !HOTJAR_ID) return;

    try {
      const w = window as unknown as { hj?: { optOut?: () => void } };
      w.hj?.optOut?.();
    } catch {
      /* Hotjar may not expose optOut in all versions */
    }

    const win = window as unknown as { hj?: unknown; _hjSettings?: unknown };
    win.hj = undefined;
    win._hjSettings = undefined;

    document
      .querySelectorAll('script#hotjar, script[src*="hotjar.com"]')
      .forEach((el) => el.remove());
  }, [hasStats, HOTJAR_ID]);

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
