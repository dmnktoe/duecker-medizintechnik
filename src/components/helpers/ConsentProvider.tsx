'use client';

import { ConsentBanner, ConsentManagerProvider } from '@c15t/nextjs';
import type { ConsentManagerOptions } from 'c15t';
import * as React from 'react';

const consentOptions: ConsentManagerOptions = {
  mode: 'offline',
};

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConsentManagerProvider options={consentOptions}>
      {children}
      <ConsentBanner />
    </ConsentManagerProvider>
  );
}
