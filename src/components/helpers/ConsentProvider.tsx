'use client';

import * as Sentry from '@sentry/nextjs';
import {
  ConsentProvider as C15tConsentProvider,
  type ConsentProviderOptions,
  useSetLanguage,
} from 'c15t/next';
import { offline } from 'c15t/react';
import * as React from 'react';

import { isLocal } from '@/constants/env';

import { ConsentSurfaces } from './consent/ConsentSurfaces';

type ConsentProviderProps = {
  children: React.ReactNode;
  /** Syncs c15t translation / policy hints with the active next-intl locale. */
  locale: string;
};

const toConsentLanguage = (locale: string) => (locale === 'en' ? 'en' : 'de');

/** Provider options are initial-only in c15t v3; later locale switches go through `useSetLanguage`. */
function buildConsentOptions(locale: string): ConsentProviderOptions {
  return {
    mode: offline(),
    consentCategories: ['necessary', 'measurement', 'marketing'],
    overrides: {
      country: 'DE',
      language: toConsentLanguage(locale),
    },
    callbacks: {
      onError: ({ error }: { error: string }) => {
        if (isLocal) Sentry.captureException(new Error(error));
      },
    },
  };
}

function ConsentLanguageSync({ locale }: { locale: string }) {
  const setLanguage = useSetLanguage();

  React.useEffect(() => {
    setLanguage(toConsentLanguage(locale));
  }, [locale, setLanguage]);

  return null;
}

export function ConsentProvider({ children, locale }: ConsentProviderProps) {
  const [options] = React.useState(() => buildConsentOptions(locale));

  return (
    <C15tConsentProvider options={options}>
      <ConsentLanguageSync locale={locale} />
      <ConsentSurfaces />
      {children}
    </C15tConsentProvider>
  );
}
