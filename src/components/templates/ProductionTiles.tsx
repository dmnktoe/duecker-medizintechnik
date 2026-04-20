'use client';

import { useTranslations } from 'next-intl';
import * as React from 'react';

import { Container } from '@/components/layout';
import { Body, Title, UnstyledLink } from '@/components/ui';

export default function ProductionTiles() {
  const t = useTranslations('production');
  return (
    <section className='pb-16 md:pb-24 lg:pb-32'>
      <Container>
        <div className='flex flex-col-reverse gap-8 lg:flex-row lg:gap-16 2xl:mx-0'>
          <div className='w-full lg:w-2/3 xl:w-1/2'>
            <div className='flex h-full flex-wrap'>
              <div className='mb-4 w-full md:mb-0 md:w-1/2'>
                <div className='flex h-full flex-col'>
                  <UnstyledLink
                    className='bg-primary-50 hover:bg-primary-100 relative mb-4 block h-full px-8 pt-8 pb-5 transition duration-200'
                    href='/produkte'
                  >
                    <div className='flex h-full max-w-sm flex-col justify-between pr-16'>
                      <Body size='sm'>{t('content.tiles.1.text')}</Body>
                      <Title size='three'>{t('content.tiles.1.title')}</Title>
                    </div>
                  </UnstyledLink>
                  <UnstyledLink
                    className='relative block h-full bg-purple-50 px-8 pt-8 pb-5 transition duration-200 hover:bg-purple-100'
                    href='/produkte'
                  >
                    <div className='flex h-full max-w-sm flex-col justify-between pr-16'>
                      <Body size='sm'>{t('content.tiles.2.text')}</Body>
                      <Title size='three'>{t('content.tiles.2.title')}</Title>
                    </div>
                  </UnstyledLink>
                </div>
              </div>
              <div className='w-full md:w-1/2 md:pl-4'>
                <UnstyledLink
                  className='relative block h-full bg-gray-50 px-8 pt-8 pb-5 transition duration-200 hover:bg-gray-100'
                  href='/produkte'
                >
                  <div className='flex h-full max-w-sm flex-col items-start justify-between pr-16'>
                    <Body size='sm'>{t('content.tiles.3.text')}</Body>
                    <Title size='three'>{t('content.tiles.3.title')}</Title>
                  </div>
                </UnstyledLink>
              </div>
            </div>
          </div>
          <div className='w-full md:py-2 lg:w-1/3 lg:px-4 lg:py-32 xl:mb-0 xl:w-1/2'>
            <Title>{t('content.tiles.title')}</Title>
            <Body>{t('content.tiles.text')}</Body>
          </div>
        </div>
      </Container>
    </section>
  );
}
