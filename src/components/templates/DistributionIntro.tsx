'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { Container } from '@/components/layout';
import { AspectRatio, Body, Title } from '@/components/ui';

import CardboardStorage from '/public/images/distribution/duecker-medizintechnik_distribution_cardboard-storage.webp';

export default function DistributionIntro() {
  const t = useTranslations('distribution');

  function IntroText() {
    return (
      <>
        <Title>{t('content.intro.title')}</Title>
        <Body>{t('content.intro.text1')}</Body>
        <Body>{t('content.intro.text2')}</Body>
      </>
    );
  }

  function IntroImage() {
    return (
      <AspectRatio ratio={1} className='w-full'>
        <Image
          src={CardboardStorage}
          alt='Cardboards in our warehouse'
          fill
          className='object-cover object-center'
        />
      </AspectRatio>
    );
  }

  return (
    <>
      <section className='mb-16 md:mb-24 lg:mb-32'>
        <Container>
          <div className='flex flex-col items-start lg:flex-row lg:gap-16'>
            <div className='mb-4 w-full md:mb-0 lg:w-2/3 xl:w-1/2'>
              <IntroText />
            </div>
            <div className='w-full lg:w-2/3 xl:w-1/2'>
              <IntroImage />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
