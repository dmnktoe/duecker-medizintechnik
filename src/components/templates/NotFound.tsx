'use client';

import { useTranslations } from 'next-intl';
import * as React from 'react';

import { ArrowLink, Title } from '@/components/ui';

export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <section className='relative py-32'>
      <div>
        <div className='flex flex-col items-center justify-center text-center'>
          <div className='bg-primary-100 text-primary-400 mb-0 text-7xl leading-none md:text-[15vw]'>
            404
          </div>
          <Title>{t('content.pageNotFound') + '.'}</Title>
          <ArrowLink
            direction='left'
            underline='hover'
            className='mt-12 md:text-lg'
            href='/'
          >
            {t('content.returnToHome')}
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
