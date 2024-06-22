import { useEffect, useState } from 'react';

import { CookieConsent, getConsentState } from './useConsentState';

interface ConsentStatus extends CookieConsent {}

interface UseConsentState {
  consent: ConsentStatus | null;
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

const useConsent = (): UseConsentState => {
  const [consent, setConsent] = useState<ConsentStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const handleConsentReady = () => {
      const consentState = getConsentState();
      setConsent(consentState);
      setLoading(false);
      setHasConsent(consentState !== null);
    };

    // Check initial consent state
    handleConsentReady();

    // Listen for Cookiebot events
    window.addEventListener('CookiebotOnConsentReady', handleConsentReady);
    window.addEventListener('CookiebotOnLoad', handleConsentReady);
    window.addEventListener('CookiebotOnAccept', handleConsentReady);
    window.addEventListener('CookiebotOnDecline', handleConsentReady);

    return () => {
      window.removeEventListener('CookiebotOnConsentReady', handleConsentReady);
      window.removeEventListener('CookiebotOnLoad', handleConsentReady);
      window.removeEventListener('CookiebotOnAccept', handleConsentReady);
      window.removeEventListener('CookiebotOnDecline', handleConsentReady);
    };
  }, []);

  const showConsentDialog = () => {
    if (typeof window !== 'undefined' && window?.Cookiebot?.show) {
      window.Cookiebot.show();
    }
  };

  const hideConsentDialog = () => {
    if (typeof window !== 'undefined' && window?.Cookiebot?.hide) {
      window.Cookiebot.hide();
    }
  };

  const renewConsent = () => {
    if (typeof window !== 'undefined' && window?.Cookiebot?.renew) {
      window.Cookiebot.renew();
    }
  };

  const submitCustomConsent = (
    preferences: boolean,
    statistics: boolean,
    marketing: boolean,
  ) => {
    if (
      typeof window !== 'undefined' &&
      window?.Cookiebot?.submitCustomConsent
    ) {
      window.Cookiebot.submitCustomConsent(preferences, statistics, marketing);
    }
  };

  return {
    consent,
    loading,
    hasConsent,
    showConsentDialog,
    hideConsentDialog,
    renewConsent,
    submitCustomConsent,
  };
};

export default useConsent;
