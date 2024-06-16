import { useEffect, useState } from 'react';

import { Consent } from '@/types/Cookiebot';

export const useCookiebotConsent = (consentType: keyof Consent) => {
  const [hasConsent, setHasConsent] = useState<boolean>(false);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window?.Cookiebot &&
      window?.Cookiebot?.consent
    ) {
      const handleCookiebotLoad = () => {
        if (window?.Cookiebot?.consent[consentType] === true) {
          setHasConsent(true);
        }
      };

      const handleCookiebotAccept = () => {
        if (window?.Cookiebot?.consent[consentType] === true) {
          setHasConsent(true);
        }
      };

      const handleCookiebotDecline = () => {
        setHasConsent(false);
      };

      if (window?.Cookiebot?.consent[consentType] === true) {
        setHasConsent(true);
      }

      window.addEventListener('CookiebotOnLoad', handleCookiebotLoad);
      window.addEventListener('CookiebotOnAccept', handleCookiebotAccept);
      window.addEventListener('CookiebotOnDecline', handleCookiebotDecline);

      return () => {
        window.removeEventListener('CookiebotOnLoad', handleCookiebotLoad);
        window.removeEventListener('CookiebotOnAccept', handleCookiebotAccept);
        window.removeEventListener(
          'CookiebotOnDecline',
          handleCookiebotDecline,
        );
      };
    }
  }, [consentType]);

  return hasConsent;
};
