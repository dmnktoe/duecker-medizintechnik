import { useTranslation } from 'next-i18next';
import * as React from 'react';

import ArrowLink from '@/components/ui/Links/ArrowLink';
import { Title } from '@/components/ui/Typography';

export default function NotFound() {
  const { t } = useTranslation('notFound');
  return (
    <section className='relative bg-white/95 bg-[url(/images/404/bentoBlur.svg)] bg-cover bg-center bg-no-repeat py-32 text-white'>
      <div>
        <div className='flex flex-col items-center justify-center text-center'>
          <div className='mb-0 text-7xl leading-none md:text-[15rem]'>404</div>
          <Title className='text-white'>
            {t('content.pageNotFound') + '.'}
          </Title>
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
