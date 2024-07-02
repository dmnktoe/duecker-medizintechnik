import Image from 'next/image';
import * as React from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
  return (
    <section className='bg-dark bg-[url(/images/distribution/optic/duecker-medizintechnik_distribution_optic-bg.webp)] bg-cover bg-top bg-no-repeat py-16 md:py-24 lg:py-32'>
      <Container className='text-center'>
        <div className='mx-auto max-w-2xl'>
          <AnimatedBadge text='Präzision und brillante 4K-Bildqualität' />
          <Title className='text-white' size='one'>
            Das hochwertige Optiksystem unserer Endoskope liefert gestochen
            scharfe Bilder von höchster Aussagekraft
          </Title>
          <Body className='text-white'>
            Die hervorragende Bildqualität ermöglicht eine präzise Diagnose und
            Therapie. Das Spektrum umfasst Arthroskope von 1,9mm bis 4,0mm in
            verschiedenen Blickrichtungen. Laparoskope von 5,0mm bis 10,0mm
            Hysteroskope und Zystoskope gehören zum Standardsortiment.
          </Body>
        </div>
        <div className='mx-auto mt-12 max-w-5xl'>
          <div className='relative overflow-hidden text-left'>
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={true}
              pagination={{ clickable: true }}
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <AspectRatio ratio={16 / 8}>
                    <Image
                      alt={slide.desc}
                      src={slide.img}
                      placeholder='blur'
                      priority
                      className='relative block overflow-hidden grayscale'
                      quality={90}
                    />
                  </AspectRatio>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Container>
    </section>
  );
}
