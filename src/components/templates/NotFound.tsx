import { useTranslation } from 'next-i18next';
import * as React from 'react';

import { ArrowLink, Title } from '@/components/ui';

export default function NotFound() {
  const { t } = useTranslation('notFound');
  return (
    <section className='relative py-32'>
      <div>
        <div className='flex flex-col items-center justify-center text-center'>
          <div className='mb-0 bg-primary-100 text-7xl leading-none text-primary-400 md:text-[15vw]'>
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
