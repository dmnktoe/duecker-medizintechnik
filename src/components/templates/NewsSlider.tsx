import { useTranslation } from 'next-i18next';
import { useCallback, useRef } from 'react';
import { VscArrowRight } from 'react-icons/vsc';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Container } from '@/components/layout/Container';
import NewsCard from '@/components/templates/NewsCard';
import SliderButton from '@/components/ui/Buttons/SliderButton';
import UnstyledLink from '@/components/ui/Links/UnstyledLink';
import { Title } from '@/components/ui/Typography';

import { Data } from '@/interfaces/Data';

type NewsSliderProps = {
  posts: Data[];
};

export const NewsSlider = ({ posts }: NewsSliderProps) => {
  const swiperElRef = useRef<SwiperRef>(null);
  const { t } = useTranslation('home');

  const handlePrev = useCallback(() => {
    if (!swiperElRef.current) return;
    swiperElRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!swiperElRef.current) return;
    swiperElRef.current.swiper.slideNext();
  }, []);

  const NewsSliderTitle = () => {
    return (
      <Title margin={false} className='lg:text-6xl'>
        {t('content.newsSlider.title')}
      </Title>
    );
  };

  const NewsSliderControls = () => {
    return (
      <div className='flex items-center justify-end gap-2'>
        <SliderButton direction='prev' handleClick={handlePrev} size='md' />
        <SliderButton direction='next' handleClick={handleNext} size='md' />
      </div>
    );
  };

  const NewsSliderReadMore = () => {
    return (
      <div className='mt-16 text-center'>
        <UnstyledLink
          className='group inline-flex items-center border-b-2 border-black pb-2 font-medium'
          href='/news'
        >
          <span className='mr-4'>{t('content.newsSlider.readMore')}</span>
          <span className='-rotate-45 transform transition duration-100 group-hover:rotate-0'>
            <VscArrowRight size={15} />
          </span>
        </UnstyledLink>
      </div>
    );
  };

  const NewsSliderCarousel = () => {
    return (
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={15}
        ref={swiperElRef}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        <div className='mb-20 flex'>
          {posts.map((post: Data, index) => (
            <SwiperSlide key={index}>
              <NewsCard post={post} orientation='vertical' />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    );
  };

  return (
    <>
      <section className='overflow-hidden bg-gray-50 py-12 md:py-24'>
        <Container>
          <div className='mb-8 flex flex-col items-center justify-between gap-3 md:mb-20 md:flex-row'>
            <div className='w-full md:w-1/2'>
              <NewsSliderTitle />
            </div>
            <div className='w-full md:w-1/2'>
              <NewsSliderControls />
            </div>
          </div>
          <NewsSliderCarousel />
          <NewsSliderReadMore />
        </Container>
      </section>
    </>
  );
};
