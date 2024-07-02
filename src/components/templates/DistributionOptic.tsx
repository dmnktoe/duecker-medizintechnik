'use client';

import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import * as React from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Container } from '@/components/layout';
import { AnimatedBadge, AspectRatio, Body, Title } from '@/components/ui';

import OpticImage1 from '/public/images/distribution/optic/duecker-medizintechnik_distribution_optic-1.webp';
import OpticImage2 from '/public/images/distribution/optic/duecker-medizintechnik_distribution_optic-2.webp';
import OpticImage3 from '/public/images/distribution/optic/duecker-medizintechnik_distribution_optic-3.webp';
import OpticImage4 from '/public/images/distribution/optic/duecker-medizintechnik_distribution_optic-4.webp';

const slides = [
  {
    img: OpticImage1,
    desc: 'Optic Image 1',
  },
  {
    img: OpticImage2,
    desc: 'Optic Image 2',
  },
  {
    img: OpticImage3,
    desc: 'Optic Image 3',
  },
  {
    img: OpticImage4,
    desc: 'Optic Image 4',
  },
];

export default function DistributionOptic() {
  const { t } = useTranslation('distribution');

  return (
    <section className='bg-gray-50 bg-[url(/images/distribution/optic/duecker-medizintechnik_distribution_optic-bg.webp)] bg-cover bg-top bg-no-repeat py-16 md:py-24 lg:py-32'>
      <Container className='text-center'>
        <div className='mx-auto max-w-3xl'>
          <AnimatedBadge text={t('content.optic.badge')} />
          <Title size='two' renderAs='h2'>
            {t('content.optic.title')}
          </Title>
          <Body>{t('content.optic.text')}</Body>
        </div>
        <div className='mx-auto mt-12 max-w-6xl'>
          <div className='bg-white/20 p-2 lg:p-6'>
            <div className='relative overflow-hidden'>
              <Swiper
                modules={[Autoplay]}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                loop={true}
                speed={800}
              >
                {slides.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <AspectRatio ratio={16 / 8}>
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
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
