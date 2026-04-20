'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { Container } from '@/components/layout';
import { AspectRatio, Body, Title } from '@/components/ui';
import { CheckIcon } from '@/components/ui/Icons';

export default function ProductionIntro() {
  const t = useTranslations('production');
  return (
    <section className='pb-16 md:pb-24 lg:pb-32'>
      <Container>
        <div className='flex flex-col items-start lg:flex-row lg:gap-16'>
          <div className='mb-4 w-full lg:mb-0 lg:w-2/3 xl:w-1/2'>
            <div className='text-dark'>
              <Title>{t('content.intro.title')}</Title>
              <Body>{t('content.intro.text1')}</Body>
              <Body>{t('content.intro.text2')}</Body>
              <Title size='four'>{t('content.intro.list.title')}</Title>
              <ul className='space-y-1'>
                <li className='flex items-center'>
                  <CheckIcon className='text-primary-500 mr-2 !h-4 !w-4' />
                  <Body margin={false}>
                    {t('content.intro.list.items.1.label')}
                  </Body>
                </li>
                <li className='flex items-center'>
                  <CheckIcon className='text-primary-500 mr-2 !h-4 !w-4' />
                  <Body margin={false}>
                    {t('content.intro.list.items.2.label')}
                  </Body>
                </li>
                <li className='flex items-center'>
                  <CheckIcon className='text-primary-500 mr-2 !h-4 !w-4' />
                  <Body margin={false}>
                    {t('content.intro.list.items.3.label')}
                  </Body>
                </li>
              </ul>
            </div>
          </div>
          <div className='w-full lg:w-1/3 xl:w-1/2'>
            <AspectRatio ratio={1}>
              <Image
                src='/images/production/duecker-medizintechnik_production_grid-bg.jpg'
                width={2000}
                height={2000}
                className='object-cover object-center'
                alt=''
              />
            </AspectRatio>
          </div>
        </div>
      </Container>
    </section>
  );
}
