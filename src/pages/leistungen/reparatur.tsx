import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { useCallback, useRef } from 'react';
import { VscArrowLeft, VscArrowRight, VscCheck } from 'react-icons/vsc';
import { Autoplay, Navigation, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';
import ImageBanner from '@/components/templates/ImageBanner/ImageBanner';
import { AspectRatio } from '@/components/ui/AspectRatio';
import NextBreadcrumb from '@/components/ui/Breadcrumb';
import { Title } from '@/components/ui/typography/Title';

import heroImg from '/public/images/repair/duecker-medizintechnik_repair_hero-bg.webp';
import repairSliderImg1 from '/public/images/repair/repair-slider_image-1.webp';
import repairSliderImg2 from '/public/images/repair/repair-slider_image-2.webp';
import repairSliderImg3 from '/public/images/repair/repair-slider_image-3.webp';
import repairSliderImg4 from '/public/images/repair/repair-slider_image-4.webp';
import repairSliderImg5 from '/public/images/repair/repair-slider_image-5.webp';
import repairSliderImg6 from '/public/images/repair/repair-slider_image-6.webp';

const RepairPage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
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
    <Layout>
      <Seo templateTitle='Reparatur' />
      <ImageBanner
        role='hero'
        delay={0}
        priority={true}
        src={heroImg}
        className='flex-1'
      />
      <main className='py-16 lg:py-24'>
        <Container>
          <NextBreadcrumb
            homeElement='Startseite'
            separator={<VscArrowRight className='mr-2 h-6 w-3' />}
            activeClasses='text-primary-500'
            containerClasses='flex'
            listClasses='hover:underline mr-2'
            capitalizeLinks
            className='mb-6'
          />
          <div className='flex flex-row items-start gap-6'>
            <div className='mb-12 w-full lg:mb-0 '>
              <div className='text-dark'>
                <Title isAnimated>
                  Durch unseren eigenen Reparaturservice garantieren wir eine
                  schnelle Bearbeitung Ihrer Reparaturaufträge
                </Title>
                <p className='text-base'>
                  Als Hersteller von sterilen und unsterilen Schlauchsystemen
                  sind wir seit Jahren im Markt etabliert. Unser
                  Produktportfolio erstreckt sich über Schwerkraft-Schlauchsets
                  bis hin zu Systemen für arthroskopische Rollenpumpen.
                  Internationale Setpacker profitieren von unseren unsterilen
                  Bulk-Lieferungen, um Ihre OP-Trays zu komplettieren. Unsere
                  ISO Klasse 8 Produktion erfüllt die hohen Ansprüche an die
                  geforderten Umgebungsbedingungen und wird regelmäßig durch
                  externe, akkreditierte Labore kontrolliert. Diese hohen
                  Qualitätsstandards bilden das Fundament unseres Schaffens.
                </p>
                <h5 className='my-6 font-semibold'>
                  Ihr vertrauenswürdiger Partner für
                </h5>
                <ul>
                  <li className='mb-4 flex items-center'>
                    <VscCheck className='mr-4 h-4 w-4 text-primary-500' />
                    <span>Qualitätsstandards</span>
                  </li>
                  <li className='mb-4 flex items-center'>
                    <VscCheck className='mr-4 h-4 w-4' />
                    <span>Arthroskopische Lösungen</span>
                  </li>
                  <li className='flex items-center'>
                    <VscCheck className='mr-4 h-4 w-4' />
                    <span>Unsterile Bulk-Lieferungen</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className='hidden w-full lg:block lg:w-1/3 xl:w-1/2'></div>
          </div>
          <div className='w-full'>
            <div className='-mx-4 mb-20 flex flex-wrap items-center'>
              <div className='w-full px-4'>
                <div className='flex items-center justify-end'>
                  <button
                    className='mr-2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-black text-black transition duration-200 hover:bg-black hover:text-white'
                    onClick={handlePrev}
                  >
                    <VscArrowLeft size={16} />
                  </button>
                  <button
                    className='inline-flex h-12 w-12 items-center justify-center rounded-full border border-black text-black transition duration-200 hover:bg-black hover:text-white'
                    onClick={handleNext}
                  >
                    <VscArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
            <Swiper
              modules={[Navigation, Scrollbar, Autoplay]}
              navigation
              spaceBetween={15}
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
              loop={true}
            >
              <div className='flex'>
                <SwiperSlide>
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={repairSliderImg1}
                      placeholder='blur'
                      priority
                      alt='Picture of the author'
                      layout='fill'
                      objectFit='cover'
                    />
                  </AspectRatio>
                </SwiperSlide>
                <SwiperSlide>
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={repairSliderImg2}
                      placeholder='blur'
                      priority
                      alt='Picture of the author'
                      layout='fill'
                      objectFit='cover'
                    />
                  </AspectRatio>
                </SwiperSlide>
                <SwiperSlide>
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={repairSliderImg3}
                      placeholder='blur'
                      priority
                      alt='Picture of the author'
                      layout='fill'
                      objectFit='cover'
                    />
                  </AspectRatio>
                </SwiperSlide>
                <SwiperSlide>
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={repairSliderImg4}
                      placeholder='blur'
                      priority
                      alt='Picture of the author'
                      layout='fill'
                      objectFit='cover'
                    />
                  </AspectRatio>
                </SwiperSlide>
                <SwiperSlide>
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={repairSliderImg5}
                      placeholder='blur'
                      priority
                      alt='Picture of the author'
                      layout='fill'
                      objectFit='cover'
                    />
                  </AspectRatio>
                </SwiperSlide>
                <SwiperSlide>
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={repairSliderImg6}
                      placeholder='blur'
                      priority
                      alt='Picture of the author'
                      layout='fill'
                      objectFit='cover'
                    />
                  </AspectRatio>
                </SwiperSlide>
              </div>
            </Swiper>
          </div>
        </Container>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'de', ['common', 'repair'])),
  },
});

export default RepairPage;
