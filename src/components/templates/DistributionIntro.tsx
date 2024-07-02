import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import * as React from 'react';

import { Container } from '@/components/layout';
import { AspectRatio, Body, Title } from '@/components/ui';

import { Partner, partners } from '@/constant/partners';

import CardboardStorage from '/public/images/distribution/duecker-medizintechnik_distribution_cardboard-storage.jpg';

export default function DistributionIntro() {
  const { t } = useTranslation('distribution');

  function IntroText() {
    return (
      <>
        <Title>{t('content.intro.title')}</Title>
        <Body>{t('content.intro.text1')}</Body>
        <Body>{t('content.intro.text2')}</Body>
        <Body>{t('content.intro.partners')}</Body>
        <div className='lg:max-w-lg'>
          <div className='grid grid-cols-4 items-center gap-x-12 gap-y-6 align-middle'>
            {partners.map((partner: Partner, index) => (
              <div
                className='divide-y py-2 text-dark/60 transition-all ease-in-out hover:text-dark'
                key={index}
              >
                <partner.image className='w-auto' />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  function IntroImage() {
    return (
      <AspectRatio ratio={4 / 3} className='w-full'>
        <Image
          src={CardboardStorage}
          alt='Global Distribution Network'
          fill
          className='object-cover object-center'
        />
      </AspectRatio>
    );
  }

  return (
    <section className='mb-16 md:mb-24 lg:mb-32'>
      <Container>
        <div className='flex flex-col items-start md:flex-row md:gap-16 lg:gap-24 2xl:gap-32'>
          <div className='mb-12 w-full md:mb-0 lg:w-2/3 xl:w-1/2'>
            <IntroText />
          </div>
          <div className='w-full lg:w-1/3 xl:w-1/2'>
            <IntroImage />
          </div>
        </div>
      </Container>
    </section>
  );
}
