import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import * as React from 'react';

import { Container } from '@/components/layout/Container';
import ButtonLink from '@/components/ui/links/ButtonLink';
import NextImage from '@/components/ui/NextImage';

export const Intro = () => {
  return (
    <>
      <section className='py-16 md:py-24 lg:py-32'>
        <BackgroundBlurTop />
        <Container>
          <div className='mx-auto mb-12 flex max-w-7xl flex-col items-center gap-12 md:mb-24 md:gap-24 lg:flex-row lg:gap-36'>
            <div className='w-full sm:w-8/12 lg:w-1/2'>
              <IntroText />
            </div>
            <div className='w-full sm:w-8/12 lg:w-1/2'>
              <NextImage
                alt='hero'
                src='/images/hero_bg.jpg'
                useSkeleton={true}
                blurDataURL='/images/hero_bg.jpg'
                width={2500}
                height={1700}
                className='h-full w-full overflow-hidden rounded-[2rem]'
              />
            </div>
          </div>
          <CustomerLogos />
        </Container>
        <BackgroundBlurBottom />
      </section>
    </>
  );
};

const IntroText = () => {
  const { t } = useTranslation('home');
  return (
    <>
      <div>
        <div className='text-left'>
          <h1 className='text-dark text-4xl font-bold tracking-tight md:text-5xl  md:leading-[1.1]'>
            {t('intro.title')}
          </h1>
          <p className='mt-6 text-lg font-semibold leading-8 text-gray-700 '>
            {t('intro.content')}
          </p>
          <div className='mt-10 flex items-center justify-start gap-x-3'>
            <ButtonLink size='base' href='/ueber-uns'>
              {t('intro.primaryButton')}
            </ButtonLink>
            <ButtonLink size='base' variant='ghost' href='/ueber-uns'>
              {t('intro.secondaryButton')}{' '}
              <span aria-hidden='true' className='ml-2'>
                →
              </span>
            </ButtonLink>
          </div>
        </div>
      </div>
    </>
  );
};

const customerLogos = [
  {
    name: 'Bissinger',
    image: '/svg/bissinger.svg',
    url: 'https://www.bissinger.com/de',
  },
  {
    name: 'Eberle',
    image: '/svg/eberle.svg',
    url: 'https://www.eberle-med.de/eberle-medizin/',
  },
  {
    name: 'Hupfer',
    image: '/svg/hupfer.svg',
    url: 'https://www.hupfer.com/de/medical',
  },
  {
    name: 'Key Surgical',
    image: '/svg/keysurgical.svg',
    url: 'https://www.keysurgical.de/',
  },
  {
    name: 'Medicon',
    image: '/svg/medicon.svg',
    url: 'https://medicon.de/',
  },
  {
    name: 'Nouvag',
    image: '/svg/nouvag.svg',
    url: 'https://www.nouvag.com/de/',
  },
];

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
        className='from-primary-800 to-primary-300 relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
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
