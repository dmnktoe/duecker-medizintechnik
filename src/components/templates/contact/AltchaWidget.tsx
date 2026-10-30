'use client';

import type { AltchaWidgetElement } from 'altcha/types/generic';
import type {} from 'altcha/types/react';
import * as React from 'react';

export interface AltchaHandle {
  getPayload: () => Promise<string | null>;
  reset: () => void;
}

interface AltchaWidgetProps {
  challengeUrl: string;
  language: string;
  ref?: React.Ref<AltchaHandle>;
}

export function AltchaWidget({
  challengeUrl,
  language,
  ref,
}: AltchaWidgetProps) {
  const elementRef = React.useRef<AltchaWidgetElement>(null);
  const payloadRef = React.useRef<string | null>(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    Promise.all([
      import('altcha'),
      import('altcha/i18n/de'),
      import('altcha/i18n/en'),
    ]).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    const element = elementRef.current;
    if (!ready || !element) return;
    const onStateChange = (event: Event) => {
      const { state, payload } = (
        event as CustomEvent<{ state: string; payload?: string }>
      ).detail;
      payloadRef.current = state === 'verified' && payload ? payload : null;
    };
    element.addEventListener('statechange', onStateChange);
    return () => element.removeEventListener('statechange', onStateChange);
  }, [ready]);

  React.useImperativeHandle(ref, () => ({
    async getPayload() {
      if (payloadRef.current) return payloadRef.current;
      const result = await elementRef.current?.verify?.();
      return result?.payload ?? null;
    },
    reset() {
      payloadRef.current = null;
      elementRef.current?.reset?.();
    },
  }));

  if (!ready) {
    return <div className='h-[58px] animate-pulse rounded-md bg-gray-100' />;
  }

  return (
    <altcha-widget
      ref={elementRef as React.Ref<HTMLElement>}
      challenge={challengeUrl}
      auto='onfocus'
      language={language}
      name='altcha'
      style={{ '--altcha-max-width': '100%' }}
    />
  );
}
