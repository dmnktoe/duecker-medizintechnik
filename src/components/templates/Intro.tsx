import * as React from 'react';

import { Container } from '@/components/layout/Container';
import ButtonLink from '@/components/links/ButtonLink';
import NextImage from '@/components/NextImage';

export const Intro = () => {
  return (
    <>
      <section className='mb-6'>
        <BackgroundBlurTop />
        <Container>
          <div className='my-auto flex h-[80vh] min-h-[60rem] items-center gap-x-48'>
            <div className='max-w-6xl'>
              <IntroText />
            </div>
            <div className='hidden w-full md:block'>
              <div className='absolute right-0 top-0 h-full max-h-[60rem] w-1/2 overflow-y-hidden object-cover'>
                <NextImage
                  alt='hero'
                  src='/images/hero_bg.jpg'
                  useSkeleton={true}
                  blurDataURL='/images/hero_bg.jpg'
                  width={1800}
                  height={1800}
                  className='h-full w-full overflow-hidden rounded-bl-[50vw]'
                />
              </div>
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
  return (
    <>
      <div>
        <div className='text-left'>
          <h1 className='text-4xl tracking-tight text-gray-900 md:text-6xl'>
            OP-Lösungen und Sterilisierungen von Dücker Medizintechnik
          </h1>
          <p className='mt-6 text-xl leading-8 text-gray-900 '>
            Entdecken Sie unser breites Spektrum an Produkten und
            Dienstleistungen für die Aufbereitung von OP-Werkzeugen. Erfahren
            Sie, wie wir Ihnen dabei helfen, eine optimale Versorgung im
            medizinischen Kontext zu gewährleisten.
          </p>
          <div className='mt-10 flex items-center justify-start gap-x-6'>
            <ButtonLink
              href='#'
              className='px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Get started
            </ButtonLink>
            <a
              href='#'
              className='text-sm font-semibold leading-6 text-gray-900'
            >
              Learn more <span aria-hidden='true'>→</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const CustomerLogos = () => {
  return (
    <div className='grid grid-cols-2 justify-around gap-8 text-neutral-600 md:grid-cols-3 lg:grid-cols-6'>
      <div className='flex'>
        <NextImage
          useSkeleton={true}
          src='/svg/bissinger.svg'
          blurDataURL='/svg/bissinger.svg'
          width='100'
          height='100'
          alt='Icon'
          className='text-neutral-600'
        />
      </div>
      <div className='self-center'>
        <NextImage
          useSkeleton
          src='/svg/eberle.svg'
          blurDataURL='/svg/eberle.svg'
          width='100'
          height='100'
          alt='Icon'
        />
      </div>
      <div className='self-center'>
        <NextImage
          useSkeleton
          src='/svg/hupfer.svg'
          blurDataURL='/svg/hupfer.svg'
          width='100'
          height='100'
          alt='Icon'
        />
      </div>
      <div className='self-center'>
        <NextImage
          useSkeleton
          src='/svg/keysurgical.svg'
          blurDataURL='/svg/keysurgical.svg'
          width='100'
          height='100'
          alt='Icon'
        />
      </div>
      <div className='self-center'>
        <NextImage
          useSkeleton
          src='/svg/medicon.svg'
          blurDataURL='/svg/medicon.svg'
          width='100'
          height='100'
          alt='Icon'
        />
      </div>
      <div className='self-center'>
        <NextImage
          useSkeleton
          src='/svg/nouvag.svg'
          blurDataURL='/svg/nouvag.svg'
          width='100'
          height='100'
          alt='Icon'
        />
      </div>
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
            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
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
