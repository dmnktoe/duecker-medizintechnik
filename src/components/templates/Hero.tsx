import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import * as React from 'react';

import { Container } from '@/components/layout/Container';
import ButtonLink from '@/components/ui/links/ButtonLink';
import NextImage from '@/components/ui/NextImage';
import { Title } from '@/components/ui/typography/Title';

import { customerLogos } from '@/constant/customerLogos';

import heroBg from '/public/images/home/duecker-medizintechnik_home_hero-bg.jpg';

export const Hero = () => {
  return (
    <section className='py-16 md:py-24 lg:py-32'>
      <BackgroundBlurTop />
      <Container>
        <div className='mb-12 flex flex-col items-center gap-12 md:mb-36 md:gap-24 lg:flex-row lg:gap-36'>
          <div className='w-full lg:w-3/5'>
            <HeroText />
          </div>
          <div className='w-full lg:w-2/5'>
            <Image
              alt='OP-Lösungen und Sterilisierungen für den B2B-Betrieb'
              src={heroBg}
              placeholder='blur'
              priority
              width={495}
              height={585}
              className='h-full w-full overflow-hidden rounded-3xl'
              quality={65}
            />
          </div>
        </div>
        <CustomerLogos />
      </Container>
      <BackgroundBlurBottom />
    </section>
  );
};

const HeroText = () => {
  const { t } = useTranslation('home');
  return (
    <div>
      <div className='text-left'>
        <Title>{t('content.hero.title')}</Title>
        <p className='mt-6 text-lg font-medium leading-8 tracking-tight text-gray-800'>
          {t('content.hero.text')}
        </p>
        <div className='mt-10 flex items-center justify-start gap-x-3'>
          <ButtonLink variant='primary' size='base' href='/leistungen'>
            {t('content.hero.buttons.primary.label')}
          </ButtonLink>
          <ButtonLink size='base' variant='ghost' href='/kontakt'>
            {t('content.hero.buttons.secondary.label')}{' '}
            <span aria-hidden='true' className='ml-2'>
              →
            </span>
          </ButtonLink>
        </div>
      </div>
    </div>
  );
};

const CustomerLogos = () => {
  return (
    <div className='grid grid-cols-2 gap-12 text-gray-500 dark:text-gray-400 sm:gap-12 md:grid-cols-3 lg:grid-cols-6'>
      {customerLogos.map((logo) => (
        <div key={logo.name} className='flex items-center justify-center'>
          <Link href={logo.url} target='_blank'>
            <NextImage
              useSkeleton={true}
              src={logo.image}
              blurDataURL={logo.image}
              width='120'
              height='100'
              alt='Icon'
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

const BackgroundBlurTop = () => {
  return (
    <div
      className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
      aria-hidden='true'
    >
      <div
        className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-800 to-primary-300 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
        style={{
          clipPath:
            'polygon(74.1% 100%, 100% 91.6%, 100%, 65.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
        }}
      />
    </div>
  );
};

const BackgroundBlurBottom = () => {
  return (
    <div
      className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
      aria-hidden='true'
    >
      <div
        className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
        style={{
          clipPath:
            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
        }}
      />
    </div>
  );
};
