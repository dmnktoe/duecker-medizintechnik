'use client';

import { useConsentManager } from '@c15t/nextjs';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { Body, Button, Title } from '@/components/ui';

import { ConsentCategoryToggles } from './ConsentCategoryToggles';

export function ConsentPreferencesSection() {
  const t = useTranslations('cookiePolicy.consent');
  const { saveConsents } = useConsentManager();

  return (
    <div className='rounded-lg border border-gray-200 bg-gray-50 p-6'>
      <Title size='four' renderAs='h2' className='!mb-2'>
        {t('dialog.title')}
      </Title>
      <Body margin={false} size='sm' className='!mb-6'>
        {t('dialog.description')}
      </Body>
      <ConsentCategoryToggles />
      <div className='mt-8 flex justify-end'>
        <Button
          variant='primary'
          size='sm'
          onClick={() => void saveConsents('custom')}
        >
          {t('save')}
        </Button>
      </div>
    </div>
  );
}
