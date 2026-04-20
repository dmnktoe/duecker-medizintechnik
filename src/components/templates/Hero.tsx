'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { useRef } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import clsxm from '@/lib/clsxm';

import { Container } from '@/components/layout/Container';
import { Body, ButtonLink, Title } from '@/components/ui';
import { Decorator } from '@/components/ui/Icons';

import { partners } from '@/constant/partners';

import heroSlide1 from '~/images/home/hero-slider/duecker-slide-1.jpg';
import heroSlide2 from '~/images/home/hero-slider/duecker-slide-2.jpg';
import heroSlide3 from '~/images/home/hero-slider/duecker-slide-3.jpg';
import heroSlide4 from '~/images/home/hero-slider/duecker-slide-4.jpg';

const HERO_SLIDES = [heroSlide1, heroSlide2, heroSlide3, heroSlide4];

const DECORATOR_POSITIONS: [string, string][] = [
  ['-top-2 left-0', 'md:h-12 md:w-12'],
  ['-top-2 left-6', 'md:left-12 md:h-12 md:w-12 bg-white/30'],
  ['left-0 top-4', 'md:top-10 md:h-12 md:w-12 bg-white/30'],
  ['bottom-2 right-0', 'md:h-12 md:w-12'],
  ['bottom-2 right-6', 'md:right-12 md:h-12 md:w-12 bg-white/30'],
  ['bottom-8 right-0', 'md:bottom-14 md:h-12 md:w-12 bg-white/30'],
];

// Module-level components — stable identity across renders
const HeroDecorators = () => (
  <>
    {DECORATOR_POSITIONS.map((pos, index) => (
      <div
        key={index}
        className={`absolute z-30 h-6 w-6 bg-white ${pos[0]} ${pos[1]}`}
      />
    ))}
  </>
);

type HeroBadgeProps = { text: string };
const HeroBadge = ({ text }: HeroBadgeProps) => (
  <div
    className={clsxm(
      'absolute -right-3 -bottom-3 z-40 w-5/6 md:-right-4 md:-bottom-4',
      'bg-primary-500/95 font-secondary p-6 text-sm tracking-tight text-white md:text-base',
    )}
  >
    {text}
  </div>
);

type HeroProgressCircleProps = {
  progressCircle: React.RefObject<SVGSVGElement | null>;
  progressContent: React.RefObject<HTMLSpanElement | null>;
};
const HeroProgressCircle = ({
  progressCircle,
  progressContent,
}: HeroProgressCircleProps) => (
  <div className='autoplay-progress' slot='container-end'>
    <svg viewBox='0 0 48 48' ref={progressCircle}>
      <circle cx='24' cy='24' r='20' />
    </svg>
    <span ref={progressContent} />
  </div>
);

const PartnerLogos = () => (
  <div className='text-muted flex flex-wrap gap-8'>
    {partners.map((partner) => (
      <div
        key={partner.name}
        className='flex flex-grow items-center justify-center px-6'
      >
        <Link href={partner.url} target='_blank'>
          <partner.image className='hover:text-dark h-6 w-20 transition-all ease-in-out md:h-10 md:w-32' />
        </Link>
      </div>
    ))}
  </div>
);

const HeroText = () => {
  const t = useTranslations('home');
  return (
    <>
      <Title>
        {t('content.hero.title')}
        <span className='text-primary-500 relative ml-1 inline-block w-8 md:w-10 lg:w-12'>
          <Decorator />
        </span>
      </Title>
      <Body size='lg'>{t('content.hero.text')}</Body>
      <div className='mt-8 flex items-center justify-start gap-x-1 lg:hidden'>
        <ButtonLink variant='dark' size='sm' href='/leistungen'>
          {t('content.hero.buttons.primary.label')}
        </ButtonLink>
        <ButtonLink variant='primary' size='sm' href='/kontakt'>
          {t('content.hero.buttons.secondary.label')}
        </ButtonLink>
      </div>
      <div className='mt-12 hidden items-center justify-start gap-x-3 lg:flex'>
        <ButtonLink variant='dark' size='base' href='/leistungen'>
          {t('content.hero.buttons.primary.label')}
        </ButtonLink>
        <ButtonLink size='base' variant='primary' href='/kontakt'>
          {t('content.hero.buttons.secondary.label')}
        </ButtonLink>
      </div>
    </>
  );
};

const HeroSlider = () => {
  const t = useTranslations('home');
  const progressCircle = useRef<SVGSVGElement>(null);
  const progressContent = useRef<HTMLSpanElement>(null);

  const onAutoplayTimeLeft = (_s: unknown, time: number, progress: number) => {
    progressCircle.current?.style.setProperty(
      '--progress',
      (1 - progress).toString(),
    );
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <div className='relative -top-2 z-20 w-full max-w-full'>
      <div className='relative aspect-[4/5] w-full max-w-full overflow-hidden'>
        <Swiper
          className='h-full w-full'
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
        >
          {HERO_SLIDES.map((slide, index) => (
            <SwiperSlide key={index} className='!h-full'>
              <Image
                alt={t('content.hero.slideAlt')}
                src={slide}
                placeholder='blur'
                priority
                className='relative block h-full w-full object-cover'
                sizes='(max-width: 1024px) 100vw, 42vw'
                quality={65}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <HeroProgressCircle
          progressCircle={progressCircle}
          progressContent={progressContent}
        />
      </div>
      <HeroBadge text={t('content.hero.badge')} />
      <HeroDecorators />
    </div>
  );
};

const HeroPartnersSection = () => {
  const t = useTranslations('home');
  return (
    <>
      <div className='font-secondary mx-auto mb-8 text-center text-xs text-gray-400 lg:w-1/3'>
        {t('content.hero.partners')}
      </div>
      <div className='mx-auto md:w-10/12 lg:w-[1000px]'>
        <PartnerLogos />
      </div>
    </>
  );
};

const HeroIntro = () => (
  <div className='mx-auto mb-12 flex max-w-full min-w-0 flex-col items-center gap-12 md:mb-36 md:max-w-3xl md:gap-24 lg:max-w-6xl lg:flex-row xl:max-w-full 2xl:px-16'>
    <div className='w-full min-w-0 flex-1 lg:w-7/12 xl:w-7/12'>
      <HeroText />
    </div>
    <div className='relative w-full min-w-0 shrink-0 lg:w-5/12 xl:w-5/12'>
      <HeroSlider />
    </div>
  </div>
);

export const Hero = () => (
  <section className='hero pt-4 pb-16 md:pt-12 md:pb-24 lg:pb-32'>
    <Container>
      <HeroIntro />
      <HeroPartnersSection />
    </Container>
  </section>
);
