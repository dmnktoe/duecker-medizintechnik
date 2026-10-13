import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * `false` during SSR and hydration, `true` afterwards. Use it to defer UI that
 * depends on browser-only state (e.g. consent stored in localStorage).
 */
export const useHydrated = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
