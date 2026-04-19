'use client';

import { useConsentManager } from '@c15t/nextjs';
import { useEffect, useState } from 'react';

/** Snapshot of choices relevant to embeds that still read from this hook. */
export interface ConsentState {
  marketing: boolean;
}

interface UseConsentReturn {
  consent: ConsentState | null;
  loading: boolean;
  showConsentDialog: () => void;
  submitCustomConsent: (statistics: boolean, marketing: boolean) => void;
}

const useConsent = (): UseConsentReturn => {
  const [mounted, setMounted] = useState(false);
  const { has, setConsent, saveConsents, setActiveUI } = useConsentManager();

  useEffect(() => {
    setMounted(true);
  }, []);

  const consent: ConsentState = {
    marketing: has('marketing'),
  };

  const showConsentDialog = () => setActiveUI('dialog');

  const submitCustomConsent = (statistics: boolean, marketing: boolean) => {
    setConsent('measurement', statistics);
    setConsent('marketing', marketing);
    saveConsents('custom');
  };

  return {
    consent: mounted ? consent : null,
    loading: !mounted,
    showConsentDialog,
    submitCustomConsent,
  };
};

export default useConsent;
