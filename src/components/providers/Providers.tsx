'use client';

import { createFlagsmithInstance } from 'flagsmith/isomorphic';
import { FlagsmithProvider } from 'flagsmith/react';
import { NextIntlClientProvider } from 'next-intl';
import * as React from 'react';
import { useRef } from 'react';

type Props = {
  children: React.ReactNode;
  flagsmithState: object;
  locale: string;
  messages: Record<string, unknown>;
};

export function Providers({ children, flagsmithState, locale, messages }: Props) {
  const flagsmithRef = useRef(createFlagsmithInstance());

  return (
    <FlagsmithProvider
      flagsmith={flagsmithRef.current}
      serverState={flagsmithState}
    >
      <NextIntlClientProvider locale={locale} messages={messages} timeZone='Europe/Berlin'>
        {children}
      </NextIntlClientProvider>
    </FlagsmithProvider>
  );
}
