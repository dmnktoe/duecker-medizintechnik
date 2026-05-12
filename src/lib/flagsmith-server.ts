import { createFlagsmithInstance } from 'flagsmith/isomorphic';
import type { IState } from 'flagsmith/types';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';

import { flagsmithId } from '@/constants/env';

const FLAGSMITH_REVALIDATE_SECONDS = 60;

const fetchFlagsmithState = unstable_cache(
  async (): Promise<IState> => {
    const instance = createFlagsmithInstance();
    await instance.init({ environmentID: flagsmithId ?? '' });
    return instance.getState();
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
