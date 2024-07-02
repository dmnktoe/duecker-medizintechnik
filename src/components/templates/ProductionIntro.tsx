import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import * as React from 'react';
import { VscCheck } from 'react-icons/vsc';

import { Container } from '@/components/layout';
import { AspectRatio, Body, Title } from '@/components/ui';

export default function ProductionIntro() {
  const { t } = useTranslation('production');
  return (
    <section className='pb-16 md:pb-24 lg:pb-32'>
      <Container>
        <div className='flex flex-col items-start lg:flex-row lg:gap-16'>
          <div className='mb-4 w-full lg:mb-0 lg:w-2/3 xl:w-1/2'>
            <div className='text-dark'>
              <Title>{t('content.title1')}</Title>
              <Body>{t('content.text1')}</Body>
              <ul className='space-y-2'>
                <li className='flex items-center'>
                  <VscCheck className='mr-4 h-4 w-4 text-primary-500' />
                  <Body margin={false}>{t('content.list.items.1.label')}</Body>
                </li>
                <li className='flex items-center'>
                  <VscCheck className='mr-4 h-4 w-4 text-primary-500' />
                  <Body margin={false}>{t('content.list.items.2.label')}</Body>
                </li>
                <li className='flex items-center'>
                  <VscCheck className='mr-4 h-4 w-4 text-primary-500' />
                  <Body margin={false}>{t('content.list.items.3.label')}</Body>
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
