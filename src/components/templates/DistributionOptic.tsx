'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import * as React from 'react';
import { useCallback, useRef } from 'react';
import { VscArrowLeft, VscArrowRight } from 'react-icons/vsc';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperRef } from 'swiper/swiper-react';
import 'swiper/css';
import 'swiper/css/effect-fade';

import { Container } from '@/components/layout';
import Marquee from '@/components/templates/Marquee';
import { AnimatedBadge, AspectRatio, Body, Title } from '@/components/ui';

import { partners } from '@/constant/partners';

import OpticImage1 from '/public/images/distribution/optic/duecker-medizintechnik_distribution_optic-1.webp';
import OpticImage2 from '/public/images/distribution/optic/duecker-medizintechnik_distribution_optic-2.webp';
import OpticImage3 from '/public/images/distribution/optic/duecker-medizintechnik_distribution_optic-3.webp';
import OpticImage4 from '/public/images/distribution/optic/duecker-medizintechnik_distribution_optic-4.webp';
import OpticImage5 from '/public/images/distribution/optic/duecker-medizintechnik_distribution_optic-5.webp';

const slides = [
  {
    img: OpticImage1,
    desc: 'Dücker Medizintechnik: Optiksystem',
  },
  {
    img: OpticImage2,
    desc: 'Dücker Medizintechnik: Optiksystem',
  },
  {
    img: OpticImage3,
    desc: 'Dücker Medizintechnik: Schutzhüllen für das Optiksystem',
  },
  {
    img: OpticImage4,
    desc: 'Dücker Medizintechnik: Schutzhüllen für das Optiksystem',
  },
  {
    img: OpticImage5,
    desc: 'Dücker Medizintechnik: Optiksystem',
  },
];

export default function DistributionOptic() {
  const { t } = useTranslation('distribution');

  const PartnerLogos = () => {
    return (
      <Marquee className='mb-4 text-gray-300 [mask-image:linear-gradient(to_right,transparent_0%,#000_15%,#000_85%,transparent_100%)] xl:mb-12'>
        {partners.map((partner) => (
          <div key={partner.name} className='px-6'>
            <Link href={partner.url} target='_blank'>
              <partner.image
                key={partner.name}
                className='h-10 w-24 md:h-10 md:w-32'
              />
            </Link>
          </div>
        ))}
      </Marquee>
    );
  };

  const OpticIntro = () => {
    return (
      <div className='mx-auto max-w-3xl'>
        <AnimatedBadge text={t('content.optic.badge')} />
        <Title size='two' renderAs='h2'>
          {t('content.optic.title')}
        </Title>
        <Body margin={false} className='text-dark/70'>
          {t('content.optic.text')}
        </Body>
      </div>
    );
  };

  const OpticSlider = () => {
    const swiperElRef = useRef<SwiperRef>(null);

    const handlePrev = useCallback(() => {
      if (!swiperElRef.current) return;
      swiperElRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
      if (!swiperElRef.current) return;
      swiperElRef.current.swiper.slideNext();
    }, []);

    return (
      <div className='mx-auto xl:-mt-24'>
        <div className='mx-auto bg-white py-2 xl:max-w-4xl xl:p-2'>
          <div className='relative overflow-hidden'>
            <Swiper
              ref={swiperElRef}
              modules={[Autoplay, EffectFade]}
              effect='fade'
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={true}
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      alt={slide.desc}
                      src={slide.img}
                      placeholder='blur'
                      priority
                      className='relative block'
                      quality={90}
                    />
                  </AspectRatio>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              type='button'
              className='group absolute start-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none'
              onClick={handlePrev}
            >
              <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50'>
                <VscArrowLeft className='h-4 w-4 text-white' />
                <span className='sr-only'>Previous</span>
              </span>
            </button>
            <button
              type='button'
              className='group absolute end-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none'
              onClick={handleNext}
            >
              <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50'>
                <VscArrowRight className='h-4 w-4 text-white' />
                <span className='sr-only'>Next</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className='py-8 md:py-16'>
      <Container>
        <PartnerLogos />
      </Container>
      <Container className='text-center'>
        <div className='mx-auto h-auto max-w-7xl bg-gray-50 bg-[url(/images/distribution/optic/duecker-medizintechnik_distribution_optic-bg.webp)] bg-cover bg-top p-8 xl:h-[30rem] xl:p-16'>
          <OpticIntro />
        </div>
        <OpticSlider />
      </Container>
    </section>
  );
}
