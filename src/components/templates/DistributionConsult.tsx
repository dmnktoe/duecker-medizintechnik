import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import * as React from 'react';

import { Container } from '@/components/layout';
import { AspectRatio, Body, Title } from '@/components/ui';

import LabelPrinter from '/public/images/distribution/duecker-medizintechnik_distribution_label-printer.webp';

export default function DistributionConsult() {
  const { t } = useTranslation('distribution', { useSuspense: false });

  function ConsultText() {
    return (
      <>
        <Title className='!text-white/90'>
          {t('content.consultation.title')}
        </Title>
        <Body className='!text-white/60'>{t('content.consultation.text')}</Body>
      </>
    );
  }

  function ConsultImage() {
    return (
      <AspectRatio ratio={4 / 4.2} className='relative -mt-56 w-full'>
        <Image
          src={LabelPrinter}
          alt='Global Distribution Network'
          fill
          className='object-cover object-center'
        />
      </AspectRatio>
    );
  }

  return (
    <section className='mt-48 bg-black pt-16 md:pt-24 lg:pt-32'>
      <Container>
        <div className='flex flex-col items-start text-white md:flex-row md:gap-16 lg:gap-24 2xl:gap-32'>
          <div className='w-full lg:w-1/3 xl:w-1/2'>
            <div className='mb-12 lg:mb-0'>
              <ConsultImage />
            </div>
          </div>
          <div className='w-full lg:w-2/3 xl:w-1/2'>
            <div className='mb-16 text-white md:mb-0'>
              <ConsultText />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
