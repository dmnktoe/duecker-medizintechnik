import { createFlagsmithInstance } from '@flagsmith/flagsmith/isomorphic';
import type { IState } from '@flagsmith/flagsmith/types';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';

import { flagsmithId } from '@/constants/env';

const FLAGSMITH_REVALIDATE_SECONDS = 300;

const EMPTY_FLAGSMITH_STATE: IState = {
  api: '',
  flags: {},
};

/** Fail open: Flagsmith outages (disabled org, missing env, network errors)
 *  must not crash SSR pages. Returns an empty state so `hasServerFeature`
 *  treats every flag as off. */
const fetchFlagsmithState = unstable_cache(
  async (): Promise<IState> => {
    if (!flagsmithId) return EMPTY_FLAGSMITH_STATE;
    try {
      const instance = createFlagsmithInstance();
      await instance.init({ environmentID: flagsmithId });
      return instance.getState();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('[flagsmith] SSR init failed, continuing without flags', {
        message: error instanceof Error ? error.message : String(error),
      });
      return EMPTY_FLAGSMITH_STATE;
    }
  },
  ['flagsmith-state'],
  { revalidate: FLAGSMITH_REVALIDATE_SECONDS, tags: ['flagsmith'] },
);

export const getFlagsmithServerState = cache(fetchFlagsmithState);

export async function hasServerFeature(name: string): Promise<boolean> {
  const state = await getFlagsmithServerState();
  const flag = state.flags?.[name];
  return Boolean(flag?.enabled);
}
