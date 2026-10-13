'use client';

import { useConsentDraft } from 'c15t/next';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import { RadixCheckbox } from '@/components/ui/RadixCheckbox';
import Skeleton from '@/components/ui/Skeleton';
import { Switch } from '@/components/ui/Switch';

import { useHydrated } from '@/utils/useHydrated';

/** Consent categories enabled for this site (see ConsentProvider). */
type ConsentCategoryName = 'necessary' | 'measurement' | 'marketing';

type ConsentCategoryTogglesProps = {
  className?: string;
};

function categoryTitle(
  t: ReturnType<typeof useTranslations>,
  name: ConsentCategoryName,
) {
  switch (name) {
    case 'necessary':
      return t('categories.necessary.title');
    case 'measurement':
      return t('categories.measurement.title');
    case 'marketing':
      return t('categories.marketing.title');
    default:
      return name;
  }
}

function categoryDescription(
  t: ReturnType<typeof useTranslations>,
  name: ConsentCategoryName,
) {
  switch (name) {
    case 'necessary':
      return t('categories.necessary.description');
    case 'measurement':
      return t('categories.measurement.description');
    case 'marketing':
      return t('categories.marketing.description');
    default:
      return '';
  }
}

export function ConsentCategoryToggles({
  className,
}: ConsentCategoryTogglesProps) {
  const t = useTranslations('cookiePolicy.consent');
  const draft = useConsentDraft();

  const hydrated = useHydrated();

  return (
    <ul className={clsxm('space-y-4', className)} aria-busy={!hydrated}>
      {draft.displayedCategories.map((category) => {
        const name = category as ConsentCategoryName;
        const checked = draft.values[name] ?? false;
        const disabled = name === 'necessary';
        const title = categoryTitle(t, name);

        return (
          <li key={name}>
            <div className='flex items-start justify-between gap-4 border-b border-gray-200 pb-4 last:border-0'>
              <div className='min-w-0 flex-1'>
                <p className='text-dark text-sm font-semibold'>{title}</p>
                <p className='text-light-gray mt-1 text-sm'>
                  {categoryDescription(t, name)}
                </p>
              </div>
              {!hydrated ? (
                disabled ? (
                  <Skeleton
                    className='mt-0.5 h-4 w-4 shrink-0 rounded border border-gray-200'
                    aria-hidden
                  />
                ) : (
                  <Skeleton
                    className='h-6 w-11 shrink-0 rounded-full'
                    aria-hidden
                  />
                )
              ) : disabled ? (
                <RadixCheckbox
                  checked={checked}
                  disabled
                  aria-label={title}
                  className='mt-0.5'
                />
              ) : (
                <Switch
                  checked={checked}
                  onCheckedChange={(value) => draft.set(name, value)}
                  aria-label={title}
                />
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
