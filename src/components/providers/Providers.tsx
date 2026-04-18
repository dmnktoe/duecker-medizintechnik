'use client';

import { createFlagsmithInstance } from 'flagsmith/isomorphic';
import { FlagsmithProvider } from 'flagsmith/react';
import i18next from 'i18next';
import * as React from 'react';
import { useMemo, useRef } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';

type Props = {
  children: React.ReactNode;
  flagsmithState: object;
  locale: string;
  translations: Record<string, Record<string, unknown>>;
};

export function Providers({
  children,
  flagsmithState,
  locale,
  translations,
}: Props) {
  const i18nInstance = useMemo(() => {
    const instance = i18next.createInstance();
    instance.use(initReactI18next).init({
      lng: locale,
      fallbackLng: 'de',
      resources: { [locale]: translations },
      interpolation: { escapeValue: false },
      returnNull: false,
    });
    return instance;
  }, [locale, translations]);

  const flagsmithRef = useRef(createFlagsmithInstance());

  return (
    <FlagsmithProvider
      flagsmith={flagsmithRef.current}
      serverState={flagsmithState}
    >
      <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
    </FlagsmithProvider>
  );
}
