import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import * as React from 'react';

import { Container } from '@/components/layout';
import { AspectRatio } from '@/components/ui/AspectRatio';
import { CheckIcon } from '@/components/ui/Icons';
import { Body, Title } from '@/components/ui/Typography';

import LabelPrinter from '/public/images/distribution/duecker-medizintechnik_distribution_label-printer.webp';

export default function DistributionConsult() {
  const { t, ready } = useTranslation('distribution', { useSuspense: false });

  function ConsultText() {
    return (
      <>
        <Title className='!text-white/90'>
          {t('content.consultation.title')}
        </Title>
        <Body className='!text-white/60'>{t('content.consultation.text')}</Body>
        <hr className='my-6 border-white/10 lg:my-12' />
        <ul className='mb-16 flex flex-col gap-6 md:mb-24 lg:flex-row lg:flex-wrap'>
          {ready &&
            t('content.consultation.list', {
              returnObjects: true,
            }).map((item, index) => (
              <li key={index} className='flex items-center'>
                <CheckIcon className='mr-2 !h-4 !w-4 text-primary-500' />
                <Body margin={false} className='!text-white/60'>
                  {item.title}
                </Body>
              </li>
            ))}
        </ul>
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
            <div className='text-white'>
              <ConsultText />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
