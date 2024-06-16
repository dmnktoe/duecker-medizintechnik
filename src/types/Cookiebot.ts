// Cookiebot.ts

export interface Consent {
  necessary: boolean; // True if the user accepted necessary cookies.
  preferences: boolean; // True if the user accepted preference cookies.
  statistics: boolean; // True if the user accepted statistics cookies.
  marketing: boolean; // True if the user accepted marketing cookies.
  method: 'indirect' | 'explicit' | null; // How consent was given.
  consented: boolean; // True if the user has consented.
  declined: boolean; // True if the user has declined cookies.
  hasResponse: boolean; // True if the user has responded to the consent dialog.
  doNotTrack: boolean; // True if 'Do Not Track' is enabled in the browser.
}

export interface Regulations {
  gdprApplies: boolean; // True if GDPR applies based on user's location.
  ccpaApplies: boolean; // True if CCPA applies based on user's location.
  lgpdApplies: boolean; // True if LGPD applies based on user's location.
}

export interface CookiebotObject {
  consent: Consent;
  regulations: Regulations;
  show(): void; // Shows the cookie consent dialog.
  hide(): void; // Hides the cookie consent dialog.
  renew(): void; // Shows the dialog for renewing or changing consent status.
  getScript(url: string, async?: boolean, callback?: () => void): void; // Loads a JavaScript file.
  runScripts(): void; // Evaluates and runs scripts based on consent status.
  withdraw(): void; // Withdraws consent.
  submitCustomConsent(
    optinPreferences: boolean,
    optinStatistics: boolean,
    optinMarketing: boolean,
  ): void; // Submits custom consent.
}

export interface CookiebotEventMap {
  CookiebotOnConsentReady: Event; // Fired when the user's consent status is ready.
  CookiebotOnLoad: Event; // Fired when the consent status is loaded.
  CookiebotOnAccept: Event; // Fired when the user accepts cookies.
  CookiebotOnDecline: Event; // Fired when the user declines cookies.
  CookiebotOnDialogInit: Event; // Fired when the consent banner is initialized.
  CookiebotOnDialogDisplay: Event; // Fired when the consent banner is displayed.
  CookiebotOnTagsExecuted: Event; // Fired when consented tags are executed.
}

export interface CookiebotCallbackMap {
  CookiebotCallback_OnLoad(): void; // Asynchronous callback when the consent banner is loaded.
  CookiebotCallback_OnAccept(): void; // Asynchronous callback when the user accepts cookies.
  CookiebotCallback_OnDecline(): void; // Asynchronous callback when the user declines cookies.
  CookiebotCallback_OnDialogInit(): void; // Callback when the consent banner is initialized.
  CookiebotCallback_OnDialogDisplay(): void; // Callback when the consent banner is displayed.
  CookiebotCallback_OnTagsExecuted(): void; // Callback when consented tags are executed.
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Window {
    Cookiebot?: CookiebotObject;

    addEventListener<K extends keyof CookiebotEventMap>(
      type: K,
      listener: (this: Window, ev: CookiebotEventMap[K]) => never,
      options?: boolean | AddEventListenerOptions,
    ): void;

    removeEventListener<K extends keyof CookiebotEventMap>(
      type: K,
      listener: (this: Window, ev: CookiebotEventMap[K]) => never,
      options?: boolean | EventListenerOptions,
    ): void;

    CookiebotCallback_OnLoad?: CookiebotCallbackMap['CookiebotCallback_OnLoad'];
    CookiebotCallback_OnAccept?: CookiebotCallbackMap['CookiebotCallback_OnAccept'];
    CookiebotCallback_OnDecline?: CookiebotCallbackMap['CookiebotCallback_OnDecline'];
    CookiebotCallback_OnDialogInit?: CookiebotCallbackMap['CookiebotCallback_OnDialogInit'];
    CookiebotCallback_OnDialogDisplay?: CookiebotCallbackMap['CookiebotCallback_OnDialogDisplay'];
    CookiebotCallback_OnTagsExecuted?: CookiebotCallbackMap['CookiebotCallback_OnTagsExecuted'];
  }
}
