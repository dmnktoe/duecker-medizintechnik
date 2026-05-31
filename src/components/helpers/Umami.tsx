'use client';

import { useConsentManager } from '@c15t/nextjs';
import Script from 'next/script';
import * as React from 'react';

export default function Umami({
  UMAMI_WEBSITE_ID,
  UMAMI_SRC,
}: {
  UMAMI_WEBSITE_ID: string | undefined;
  UMAMI_SRC: string | undefined;
}) {
  const { has } = useConsentManager();
  const hasStats = has('measurement');

  React.useEffect(() => {
    if (hasStats || !UMAMI_WEBSITE_ID || !UMAMI_SRC) return;

    const win = window as unknown as { umami?: unknown };
    win.umami = undefined;

    document
      .querySelectorAll('script#umami, script[data-website-id]')
      .forEach((el) => el.remove());
  }, [hasStats, UMAMI_WEBSITE_ID, UMAMI_SRC]);

  if (!UMAMI_WEBSITE_ID || !UMAMI_SRC || !hasStats) return null;

  return (
    <Script
      id='umami'
      strategy='afterInteractive'
      src={UMAMI_SRC}
      data-website-id={UMAMI_WEBSITE_ID}
    />
  );
}
