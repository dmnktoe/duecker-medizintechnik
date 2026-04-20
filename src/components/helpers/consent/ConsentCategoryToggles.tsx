'use client';

import { useConsentManager } from '@c15t/nextjs';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import { RadixCheckbox } from '@/components/ui/RadixCheckbox';
import Skeleton from '@/components/ui/Skeleton';
import { Switch } from '@/components/ui/Switch';

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
  const {
    consents,
    getDisplayedConsents,
    selectedConsents,
    setSelectedConsent,
  } = useConsentManager();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const types = getDisplayedConsents();

  return (
    <ul className={clsxm('space-y-4', className)} aria-busy={!mounted}>
      {types.map((type: { name: string; disabled?: boolean }) => {
        const name = type.name as ConsentCategoryName;
        const checked = selectedConsents[name] ?? consents[name] ?? false;
        const disabled = Boolean(type.disabled);
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
              {!mounted ? (
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
                  onCheckedChange={(value) => setSelectedConsent(name, value)}
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
