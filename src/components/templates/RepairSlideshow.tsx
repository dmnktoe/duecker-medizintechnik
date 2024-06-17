'use client';

import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import * as React from 'react';
import { useCallback, useRef } from 'react';
import { Autoplay, Navigation, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';

import { Container } from '@/components/layout';
import { AspectRatio, SliderButton } from '@/components/ui';

import repairSliderImg1 from '/public/images/repair/repair-slider_image-1.webp';
import repairSliderImg2 from '/public/images/repair/repair-slider_image-2.webp';
import repairSliderImg3 from '/public/images/repair/repair-slider_image-3.webp';
import repairSliderImg4 from '/public/images/repair/repair-slider_image-4.webp';
import repairSliderImg5 from '/public/images/repair/repair-slider_image-5.webp';
import repairSliderImg6 from '/public/images/repair/repair-slider_image-6.webp';

export default function RepairSlideshow() {
  const swiperElRef = useRef<SwiperRef>(null);
  const { t } = useTranslation('repair');

  const handlePrev = useCallback(() => {
    if (!swiperElRef.current) return;
    swiperElRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!swiperElRef.current) return;
    swiperElRef.current.swiper.slideNext();
  }, []);

  const text = (
    <>
      <div className='mt-3 w-3/4 text-xs text-gray-400 lg:w-1/2'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
        incidunt ipsam quam quidem quis saepe. Assumenda atque autem consectetur
        cum dolore ducimus earum est eveniet ex illum.
      </div>
    </>
  );

  return (
    <section className='mb-16 md:mb-24 lg:mb-32'>
      <Container>
        <div className='w-full'>
          <div className='-mx-4 mb-4 flex flex-wrap items-center'>
            <div className='w-full px-4'>
              <div className='flex items-center justify-end gap-2'>
                <SliderButton direction='prev' handleClick={handlePrev} />
                <SliderButton direction='next' handleClick={handleNext} />
              </div>
            </div>
          </div>
          <Swiper
            modules={[Navigation, Scrollbar, Autoplay]}
            navigation
            spaceBetween={5}
            ref={swiperElRef}
            scrollbar={{
              hide: false,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={false}
          >
            <div className='flex'>
              <SwiperSlide>
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={repairSliderImg1}
                    placeholder='blur'
                    priority
                    alt={t('content.title')}
                    layout='fill'
                    objectFit='cover'
                  />
                </AspectRatio>
                {text}
              </SwiperSlide>
              <SwiperSlide>
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={repairSliderImg2}
                    placeholder='blur'
                    priority
                    alt={t('content.title')}
                    layout='fill'
                    objectFit='cover'
                  />
                </AspectRatio>
                {text}
              </SwiperSlide>
              <SwiperSlide>
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={repairSliderImg3}
                    placeholder='blur'
                    priority
                    alt={t('content.title')}
                    layout='fill'
                    objectFit='cover'
                  />
                </AspectRatio>
                {text}
              </SwiperSlide>
              <SwiperSlide>
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={repairSliderImg4}
                    placeholder='blur'
                    priority
                    alt={t('content.title')}
                    layout='fill'
                    objectFit='cover'
                  />
                </AspectRatio>
                {text}
              </SwiperSlide>
              <SwiperSlide>
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={repairSliderImg5}
                    placeholder='blur'
                    priority
                    alt={t('content.title')}
                    layout='fill'
                    objectFit='cover'
                  />
                </AspectRatio>
                {text}
              </SwiperSlide>
              <SwiperSlide>
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={repairSliderImg6}
                    placeholder='blur'
                    priority
                    alt={t('content.title')}
                    layout='fill'
                    objectFit='cover'
                  />
                </AspectRatio>
                {text}
              </SwiperSlide>
            </div>
          </Swiper>
        </div>
      </Container>
    </section>
  );
}
