'use client';

import {
  useConsent as useC15tConsent,
  useSaveConsents,
  useSetActiveUI,
} from '@c15t/nextjs';
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
  const hasMarketing = useC15tConsent('marketing');
  const saveConsents = useSaveConsents();
  const setActiveUI = useSetActiveUI();

  useEffect(() => {
    setMounted(true);
  }, []);

  const consent: ConsentState = {
    marketing: hasMarketing,
  };

  const showConsentDialog = () => setActiveUI('dialog');

  const submitCustomConsent = (statistics: boolean, marketing: boolean) => {
    void saveConsents({ measurement: statistics, marketing });
  };

  return {
    consent: mounted ? consent : null,
    loading: !mounted,
    showConsentDialog,
    submitCustomConsent,
  };
};

export default useConsent;
