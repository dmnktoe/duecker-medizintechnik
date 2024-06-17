// useConsentState.ts

export interface CookieConsent {
  necessary: boolean;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
  method: string | null;
  consented: boolean;
  declined: boolean;
  hasResponse: boolean;
  doNotTrack: boolean;
}

export const getConsentState = (): CookieConsent | null => {
  if (typeof window !== 'undefined' && window?.Cookiebot?.consent) {
    const { consent } = window.Cookiebot;
    return {
      necessary: consent.necessary,
      preferences: consent.preferences,
      statistics: consent.statistics,
      marketing: consent.marketing,
      method: consent.method,
      consented: consent.consented,
      declined: consent.declined,
      hasResponse: consent.hasResponse,
      doNotTrack: consent.doNotTrack,
    };
  }
  return null;
};
