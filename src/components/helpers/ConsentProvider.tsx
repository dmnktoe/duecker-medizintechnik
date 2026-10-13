'use client';

import {
  ConsentProvider as C15tConsentProvider,
  type ConsentProviderOptions,
} from '@c15t/nextjs';
import { offline } from '@c15t/react';
import * as Sentry from '@sentry/nextjs';
import * as React from 'react';

import { isLocal } from '@/constants/env';

import { ConsentSurfaces } from './consent/ConsentSurfaces';

type ConsentProviderProps = {
  children: React.ReactNode;
  /** Syncs c15t translation / policy hints with the active next-intl locale. */
  locale: string;
};

function buildConsentOptions(locale: string): ConsentProviderOptions {
  const language = locale === 'en' ? 'en' : 'de';

  return {
    mode: offline(),
    noStyle: true,
    consentCategories: ['necessary', 'measurement', 'marketing'],
    overrides: {
      country: 'DE',
      language,
    },
    callbacks: {
      onError: ({ error }: { error: string }) => {
        if (isLocal) Sentry.captureException(new Error(error));
      },
    },
  };
}

export function ConsentProvider({ children, locale }: ConsentProviderProps) {
  const options = React.useMemo(() => buildConsentOptions(locale), [locale]);

  return (
    <C15tConsentProvider options={options}>
      <ConsentSurfaces />
      {children}
    </C15tConsentProvider>
  );
}
