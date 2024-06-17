import { useTranslation } from 'next-i18next';
import * as React from 'react';
import {
  VscCombine,
  VscFeedback,
  VscLayout,
  VscTerminalBash,
} from 'react-icons/vsc';

import { Container } from '@/components/layout';
import { Body, Title } from '@/components/ui';

export default function DistributionFeatures() {
  const { t } = useTranslation('distribution');
  return (
    <section>
      <Container>
        <div className='my-8 flex gap-10 bg-white max-lg:flex-col'>
          <div className='mx-auto lg:max-w-md'>
            <Title size='two'>{t('content.features.title')}</Title>
            <Body size='sm' color='light'>
              {t('content.features.text')}
            </Body>
          </div>
          <div className='mx-auto grid gap-6 md:grid-cols-2 lg:gap-8'>
            <div className='bg-primary-50 p-6 text-left'>
              <VscCombine className='inline-block h-12 w-12 overflow-visible rounded-full bg-white p-3 text-primary-500' />
              <Title size='four' className='mb-2 mt-6'>
                {t('content.features.1.title')}
              </Title>
              <Body size='sm'>{t('content.features.1.text')}</Body>
            </div>
            <div className='bg-primary-50 p-6 text-left'>
              <VscLayout className='inline-block h-12 w-12 overflow-visible rounded-full bg-white p-3 text-primary-500' />
              <Title size='four' className='mb-2 mt-6'>
                {t('content.features.2.title')}
              </Title>
              <Body size='sm'>{t('content.features.2.text')}</Body>
            </div>
            <div className='bg-primary-50 p-6 text-left'>
              <VscTerminalBash className='inline-block h-12 w-12 overflow-visible rounded-full bg-white p-3 text-primary-500' />
              <Title size='four' className='mb-2 mt-6'>
                {t('content.features.3.title')}
              </Title>
              <Body size='sm'>{t('content.features.3.text')}</Body>
            </div>
            <div className='bg-primary-50 p-6 text-left'>
              <VscFeedback className='inline-block h-12 w-12 overflow-visible rounded-full bg-white p-3 text-primary-500' />
              <Title size='four' className='mb-2 mt-6'>
                {t('content.features.4.title')}
              </Title>
              <Body size='sm'>{t('content.features.4.text')}</Body>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
