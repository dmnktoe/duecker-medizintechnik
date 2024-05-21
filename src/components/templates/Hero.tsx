'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import * as React from 'react';
import { useRef } from 'react';
import { VscArrowRight } from 'react-icons/vsc';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import clsxm from '@/lib/clsxm';

import { Container } from '@/components/layout/Container';
import ButtonLink from '@/components/ui/Links/ButtonLink';
import { Body, Title } from '@/components/ui/Typography';

import { partners } from '@/constant/partners';

import heroSlide1 from '/public/images/home/hero-slider/duecker-slide-1.jpg';
import heroSlide2 from '/public/images/home/hero-slider/duecker-slide-2.jpg';
import heroSlide3 from '/public/images/home/hero-slider/duecker-slide-3.jpg';
import heroSlide4 from '/public/images/home/hero-slider/duecker-slide-4.jpg';

export const Hero = () => {
  return (
    <section className='hero pb-16 pt-4 md:pb-24 md:pt-12 lg:pb-32'>
      <Container>
        <HeroIntro />
        <HeroPartnersSection />
      </Container>
    </section>
  );
};

const HeroIntro = () => {
  return (
    <div className='mx-auto mb-12 flex max-w-full flex-col items-center gap-12 md:mb-36 md:max-w-3xl md:gap-24 lg:max-w-6xl lg:flex-row xl:max-w-full 2xl:px-16'>
      <div className='w-full lg:w-7/12 xl:w-7/12'>
        <HeroText />
      </div>
      <div className='relative w-full lg:w-5/12 xl:w-5/12'>
        <HeroSlider />
      </div>
    </div>
  );
};

const HeroText = () => {
  const { t } = useTranslation('home');
  return (
    <div className='text-left'>
      <Title>{t('content.hero.title')}</Title>
      <Body size='lg'>{t('content.hero.text')}</Body>
      <div className='mt-10 flex items-center justify-start gap-x-3'>
        <ButtonLink variant='primary' size='sm' href='/leistungen'>
          {t('content.hero.buttons.primary.label')}
          <span aria-hidden='true' className='ml-2'>
            <VscArrowRight />
          </span>
        </ButtonLink>
        <ButtonLink size='sm' variant='ghost' href='/kontakt'>
          {t('content.hero.buttons.secondary.label')}{' '}
        </ButtonLink>
      </div>
    </div>
  );
};

const HeroSlider = () => {
  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);
  const onAutoplayTimeLeft = (s: unknown, time: number, progress: number) => {
    progressCircle.current?.style.setProperty(
      '--progress',
      (1 - progress).toString(),
    );

    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  const { t } = useTranslation('home');

  const HeroDecorators = () => {
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

  const HeroBadge = () => {
    return (
      <div
        className={clsxm(
          'absolute -bottom-3 -right-3 z-40 w-5/6 md:-bottom-4 md:-right-4',
          'bg-primary-500/95 p-6 font-secondary text-sm tracking-tight text-white md:text-base',
        )}
      >
        {t('content.hero.badge')}
      </div>
    );
  };

  const HeroProgressCircle = () => {
    return (
      <div className='autoplay-progress' slot='container-end'>
        <svg viewBox='0 0 48 48' ref={progressCircle}>
          <circle cx='24' cy='24' r='20'></circle>
        </svg>
        <span ref={progressContent}></span>
      </div>
    );
  };

  const slides = [
    {
      image: heroSlide1,
      alt: 'OP-Lösungen und Sterilisierungen für den B2B-Betrieb',
    },
    {
      image: heroSlide2,
      alt: 'OP-Lösungen und Sterilisierungen für den B2B-Betrieb',
    },
    {
      image: heroSlide3,
      alt: 'OP-Lösungen und Sterilisierungen für den B2B-Betrieb',
    },
    {
      image: heroSlide4,
      alt: 'OP-Lösungen und Sterilisierungen für den B2B-Betrieb',
    },
  ];

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
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Image
                alt={slide.alt}
                src={slide.image}
                placeholder='blur'
                priority
                className='relative block h-full w-full overflow-hidden'
                quality={65}
              />
            </SwiperSlide>
          ))}
          <HeroProgressCircle />
        </Swiper>
      </div>
      <HeroBadge />
      <HeroDecorators />
    </>
  );
};

const HeroPartnersSection = () => {
  const { t } = useTranslation('home');

  const PartnerLogos = () => {
    return (
      <div className='flex flex-wrap gap-8 text-gray-300'>
        {partners.map((partner) => (
          <div
            key={partner.name}
            className='flex flex-grow items-center justify-center px-6'
          >
            <Link href={partner.url} target='_blank'>
              <partner.image
                key={partner.name}
                className='h-6 w-20 transition-all ease-in-out hover:text-dark md:h-10 md:w-32'
              />
            </Link>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className='mx-auto mb-8 text-center font-secondary text-xs text-gray-400 lg:w-1/3'>
        {t('content.hero.partners')}
      </div>
      <div className='mx-auto md:w-10/12 lg:w-8/12'>
        <PartnerLogos />
      </div>
    </>
  );
};
