'use client';

import { ConsentManagerProvider } from '@c15t/nextjs';
import * as Sentry from '@sentry/nextjs';
import type { ComponentProps } from 'react';
import * as React from 'react';

import { isLocal } from '@/constants/env';

import { ConsentSurfaces } from './consent/ConsentSurfaces';

type ConsentManagerProviderOptions = ComponentProps<
  typeof ConsentManagerProvider
>['options'];

type ConsentProviderProps = {
  children: React.ReactNode;
  /** Syncs c15t translation / policy hints with the active next-intl locale. */
  locale: string;
};

function buildConsentOptions(locale: string): ConsentManagerProviderOptions {
  const language = locale === 'en' ? 'en' : 'de';

  return {
    mode: 'offline',
    noStyle: true,
    consentCategories: ['necessary', 'measurement', 'marketing'],
    store: {
      overrides: {
        country: 'DE',
        language,
      },
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
    <ConsentManagerProvider options={options}>
      <ConsentSurfaces />
      {children}
    </ConsentManagerProvider>
  );
}
