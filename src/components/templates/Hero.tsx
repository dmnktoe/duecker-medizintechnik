'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import * as React from 'react';
import { useRef } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Container } from '@/components/layout/Container';
import ButtonLink from '@/components/ui/links/ButtonLink';
import UnstyledLink from '@/components/ui/links/UnstyledLink';
import { Title } from '@/components/ui/typography/Title';

import { partners } from '@/constant/partners';

import heroBg from '/public/images/home/duecker-medizintechnik_home_hero-bg.jpg';
import heroBg2 from '/public/images/home/duecker-medizintechnik_home_hero-bg-2.jpg';

export const Hero = () => {
  return (
    <section className='hero pb-16 pt-4 md:pb-24 md:pt-12 lg:pb-32'>
      <Container>
        <div className='mx-auto mb-12 flex max-w-full flex-col items-center gap-12 md:mb-36 md:max-w-3xl md:gap-24 lg:max-w-5xl lg:flex-row xl:max-w-full'>
          <div className='w-full lg:w-8/12 xl:w-6/12'>
            <HeroText />
          </div>
          <div className='relative w-full lg:w-4/12 xl:w-6/12'>
            <HeroSlider />
          </div>
        </div>
        <div className='mx-auto mb-8 text-center text-xs text-neutral-400 lg:w-1/3'>
          Mit unseren Vertriebspartnern in Europa und den USA sind wir in der
          Lage, unsere Produkte weltweit zu vertreiben:
        </div>
        <div className='mx-auto md:w-10/12 lg:w-8/12'>
          <CustomerLogos />
        </div>
      </Container>
    </section>
  );
};

const HeroText = () => {
  const { t } = useTranslation('home');
  return (
    <div>
      <div className='text-left'>
        <Title>{t('content.hero.title')}</Title>
        <p className='mt-6 text-base font-normal leading-7 tracking-tight text-neutral-600 md:text-lg md:leading-8'>
          {t('content.hero.text')}
        </p>
        <div className='mt-10 flex items-center justify-start gap-x-3'>
          <ButtonLink variant='primary' size='sm' href='/leistungen'>
            {t('content.hero.buttons.primary.label')}
            <span aria-hidden='true' className='ml-2'>
              →
            </span>
          </ButtonLink>
          <ButtonLink size='sm' variant='ghost' href='/kontakt'>
            {t('content.hero.buttons.secondary.label')}{' '}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
};

const HeroSlider = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s: unknown, time: number, progress: number) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const Decorators = () => {
    const positions = [
      ['-top-2 left-0', 'md:h-12 md:w-12'],
      ['-top-2 left-6', 'md:left-12 md:h-12 md:w-12 bg-white/30'],
      ['left-0 top-4', 'md:top-10 md:h-12 md:w-12 bg-white/30'],
      ['bottom-2 right-0', 'md:h-12 md:w-12'],
      ['bottom-2 right-6', 'md:right-12 md:h-12 md:w-12 bg-white/30'],
      ['bottom-8 right-0', 'md:bottom-14 md:h-12 md:w-12 bg-white/30'],
    ];

    return (
      <>
        {positions.map((pos, index) => (
          <div
            key={index}
            className={`absolute z-30 h-6 w-6 bg-white ${pos[0]} ${pos[1]}`}
          />
        ))}
      </>
    );
  };

  return (
    <>
      <div className='relative -top-2 z-20'>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={2}
          slidesPerView={1}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          <SwiperSlide>
            <Image
              alt='OP-Lösungen und Sterilisierungen für den B2B-Betrieb'
              src={heroBg}
              placeholder='blur'
              priority
              className='relative block h-full w-full overflow-hidden'
              quality={65}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt='OP-Lösungen und Sterilisierungen für den B2B-Betrieb'
              src={heroBg2}
              placeholder='blur'
              priority
              className='relative block h-full w-full overflow-hidden'
              quality={65}
            />
          </SwiperSlide>
          <div className='autoplay-progress' slot='container-end'>
            <svg viewBox='0 0 48 48' ref={progressCircle}>
              <circle cx='24' cy='24' r='20'></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </div>
      <div className='absolute -bottom-3 -right-3 z-40 w-5/6 bg-primary-500/95 p-6 text-sm tracking-tight text-white md:-bottom-4 md:-right-4 md:text-base'>
        Ihr{' '}
        <UnstyledLink className='underline' href='/unternehmen'>
          {' '}
          Ansprechpartner
        </UnstyledLink>{' '}
        für Handelsvermittlung von pharmazeutischen Erzeugnissen, medizinischen
        und orthopädischen Artikeln und Laborbedarf.
      </div>
      <Decorators />
    </>
  );
};

const CustomerLogos = () => {
  return (
    <div className='flex flex-wrap gap-8 text-dark'>
      {partners.map((partner) => (
        <div
          key={partner.name}
          className='flex flex-grow items-center justify-center px-6'
        >
          <Link href={partner.url} target='_blank'>
            <partner.image
              key={partner.name}
              className='h-6 w-20 opacity-20 transition-all ease-in-out hover:opacity-100 md:h-10 md:w-32'
            />
          </Link>
        </div>
      ))}
    </div>
  );
};
