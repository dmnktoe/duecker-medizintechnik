'use client';

import { useConsentManager } from '@c15t/nextjs';
import { useEffect, useState } from 'react';

export interface ConsentState {
  necessary: boolean;
  /** @deprecated No longer used; retained for compatibility. Always false. */
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
  method: string | null;
  consented: boolean;
  declined: boolean;
  hasResponse: boolean;
  doNotTrack: boolean;
}

interface UseConsentReturn {
  consent: ConsentState | null;
  loading: boolean;
  hasConsent: boolean | null;
  showConsentDialog: () => void;
  hideConsentDialog: () => void;
  renewConsent: () => void;
  submitCustomConsent: (
    preferences: boolean,
    statistics: boolean,
    marketing: boolean,
  ) => void;
}

const useConsent = (): UseConsentReturn => {
  const [mounted, setMounted] = useState(false);
  const { has, hasConsented, setConsent, saveConsents, setActiveUI } =
    useConsentManager();

  useEffect(() => {
    setMounted(true);
  }, []);

  const consent: ConsentState = {
    necessary: has('necessary'),
    preferences: false,
    statistics: has('measurement'),
    marketing: has('marketing'),
    method: null,
    consented: hasConsented(),
    declined: !hasConsented() && mounted,
    hasResponse: hasConsented(),
    doNotTrack: false,
  };

  const showConsentDialog = () => setActiveUI('dialog');
  const hideConsentDialog = () => setActiveUI('none');
  const renewConsent = () => setActiveUI('banner');

  const submitCustomConsent = (
    _preferences: boolean,
    statistics: boolean,
    marketing: boolean,
  ) => {
    setConsent('measurement', statistics);
    setConsent('marketing', marketing);
    saveConsents('custom');
  };

  return {
    consent: mounted ? consent : null,
    loading: !mounted,
    hasConsent: mounted ? hasConsented() : null,
    showConsentDialog,
    hideConsentDialog,
    renewConsent,
    submitCustomConsent,
  };
};

export default useConsent;
