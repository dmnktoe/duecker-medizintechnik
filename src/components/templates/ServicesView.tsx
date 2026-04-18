'use client';

import { useTranslations } from 'next-intl';
import * as React from 'react';
import { VscArrowRight } from 'react-icons/vsc';

import { Container } from '@/components/layout/Container';
import { Body, ButtonLink, Title } from '@/components/ui';

type ServiceCard = {
  key: 'production' | 'repair' | 'distribution';
};

const SERVICE_CARDS: ServiceCard[] = [
  { key: 'production' },
  { key: 'repair' },
  { key: 'distribution' },
];

export default function ServicesView() {
  const t = useTranslations('services');

  return (
    <section className='mx-auto max-w-5xl pb-16 md:pb-24'>
      <Container>
        <div className='mb-10'>
          <span className='font-secondary text-xs tracking-widest text-primary-500'>
            {t('content.badge')}
          </span>
          <Title renderAs='h1' className='mt-2'>
            {t('content.title')}
          </Title>
          <Body color='light' className='max-w-2xl'>
            {t('content.text')}
          </Body>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
          {SERVICE_CARDS.map(({ key }, index) => (
            <div
              key={key}
              className='flex flex-col justify-between border-t-2 border-primary-500 bg-gray-50 p-6 transition-colors duration-200 hover:bg-primary-50/50'
            >
              <div>
                <span className='font-secondary text-xs tracking-widest text-primary-400'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <Title
                  margin={false}
                  size='three'
                  renderAs='h2'
                  className='mt-2'
                >
                  {t(`content.cards.${key}.title`)}
                </Title>
                <Body margin={false} color='light' size='sm' className='mt-3'>
                  {t(`content.cards.${key}.text`)}
                </Body>
              </div>
              <div className='mt-6'>
                <ButtonLink
                  href={`/leistungen/${t(`content.cards.${key}.href`)}`}
                  variant='dark'
                  size='sm'
                >
                  {t('content.cards.readMore')}
                  <VscArrowRight className='ml-2' />
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
