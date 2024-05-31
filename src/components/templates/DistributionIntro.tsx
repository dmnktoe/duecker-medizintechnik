import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import * as React from 'react';

import { Container } from '@/components/layout';
import { AspectRatio } from '@/components/ui/AspectRatio';
import { Body, Title } from '@/components/ui/Typography';

import { Partner, partners } from '@/constant/partners';

import CardboardStorage from '/public/images/distribution/duecker-medizintechnik_distribution_cardboard-storage.jpg';

export default function DistributionIntro() {
  const { t } = useTranslation('distribution');
  return (
    <section className='mb-16 lg:mb-24'>
      <Container>
        <div className='flex flex-col items-start md:flex-row md:gap-16'>
          <div className='mb-12 w-full lg:w-2/3 xl:w-1/2'>
            <div className='text-dark'>
              <Title>{t('content.intro.title')}</Title>
              <Body>{t('content.intro.text1')}</Body>
              <Body>{t('content.intro.text2')}</Body>
              <hr className='my-6 border-dark/10 lg:my-12' />
              <Body isStrong>{t('content.intro.partners')}</Body>
              <div className='lg:max-w-lg'>
                <div className='mb-6 grid grid-cols-4 items-center gap-x-12 gap-y-6 align-middle'>
                  {partners.map((partner: Partner) => (
                    <div
                      className='divide-y py-2 text-dark/60 transition-all ease-in-out hover:text-dark'
                      key={partner.name}
                    >
                      <partner.image className='w-auto' />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='w-full lg:w-1/3 xl:w-1/2'>
            <AspectRatio ratio={4 / 3} className='w-full'>
              <Image
                src={CardboardStorage}
                alt='Global Distribution Network'
                fill
                className='object-cover object-center'
              />
            </AspectRatio>
          </div>
        </div>
      </Container>
    </section>
  );
}
