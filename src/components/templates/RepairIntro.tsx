import { useTranslation } from 'next-i18next';
import * as React from 'react';

import { Container } from '@/components/layout';
import { Body, Title } from '@/components/ui/Typography';

export default function RepairIntro() {
  const { t } = useTranslation('repair');

  return (
    <section className='mb-16 md:mb-24'>
      <Container>
        <div className='flex flex-row items-start gap-6'>
          <div className='w-full lg:mb-0'>
            <div className='text-dark'>
              <Title>{t('content.title')}</Title>
              <Body>{t('content.text1')}</Body>
              <Body>{t('content.text2')}</Body>
            </div>
          </div>
          <div className='hidden w-full lg:block lg:w-1/3 xl:w-1/2'></div>
        </div>
      </Container>
    </section>
  );
}
