export interface Consent {
  necessary: boolean;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
  method: 'indirect' | 'explicit' | null;
  consented: boolean;
  declined: boolean;
  hasResponse: boolean;
  doNotTrack: boolean;
}

export interface Regulations {
  gdprApplies: boolean;
  ccpaApplies: boolean;
  lgpdApplies: boolean;
}

export interface CookiebotObject {
  consent: Consent;
  regulations: Regulations;
  show(): void;
  hide(): void;
  renew(): void;
  getScript(url: string, async?: boolean, callback?: () => void): void;
  runScripts(): void;
  withdraw(): void;
  submitCustomConsent(
    optinPreferences: boolean,
    optinStatistics: boolean,
    optinMarketing: boolean,
  ): void;
}

export interface CookiebotEventMap {
  CookiebotOnConsentReady: Event;
  CookiebotOnLoad: Event;
  CookiebotOnAccept: Event;
  CookiebotOnDecline: Event;
  CookiebotOnDialogInit: Event;
  CookiebotOnDialogDisplay: Event;
  CookiebotOnTagsExecuted: Event;
}

export interface CookiebotCallbackMap {
  CookiebotCallback_OnLoad(): void;
  CookiebotCallback_OnAccept(): void;
  CookiebotCallback_OnDecline(): void;
  CookiebotCallback_OnDialogInit(): void;
  CookiebotCallback_OnDialogDisplay(): void;
  CookiebotCallback_OnTagsExecuted(): void;
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
