import { useTranslation } from 'next-i18next';
import { useCallback, useRef } from 'react';
import { VscArrowLeft, VscArrowRight } from 'react-icons/vsc';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Container } from '@/components/layout/Container';
import PostsCarouselCard from '@/components/templates/PostsCarousel/PostsCarouselCard';
import UnstyledLink from '@/components/ui/links/UnstyledLink';

import { Data } from '@/interfaces/model';

type PostsCarouselProps = {
  posts: Data[];
};

export const PostsCarousel = ({ posts }: PostsCarouselProps) => {
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

  return (
    <>
      <section className='overflow-hidden bg-gray-50 py-12 md:py-24'>
        <Container>
          <div className='-mx-4 mb-20 flex flex-wrap items-center'>
            <div className='mb-8 w-full px-4 md:mb-0 md:w-1/2'>
              <h1 className='font-heading text-4xl tracking-tighter lg:text-6xl'>
                {t('postsCarousel.headline')}
              </h1>
            </div>
            <div className='w-full px-4 md:w-1/2'>
              <div className='flex items-center justify-end'>
                <button
                  className='sm:h-18 sm:w-18 mr-2 inline-flex h-16 w-16 items-center justify-center rounded-full border border-black text-black transition duration-200 hover:bg-black hover:text-white'
                  onClick={handlePrev}
                >
                  <VscArrowLeft size={28} />
                </button>
                <button
                  className='sm:h-18 sm:w-18 inline-flex h-16 w-16 items-center justify-center rounded-full border border-black text-black transition duration-200 hover:bg-black hover:text-white'
                  onClick={handleNext}
                >
                  <VscArrowRight size={28} />
                </button>
              </div>
            </div>
          </div>
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
                slidesPerView: 3,
              },
            }}
          >
            <div className='mb-20 flex'>
              {posts.map((post: Data, index) => (
                <SwiperSlide key={index}>
                  <PostsCarouselCard post={post} />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
          <div className='mt-16 text-center'>
            <UnstyledLink
              className='group inline-flex items-center border-b-2 border-black pb-2 font-medium leading-none'
              href='/news'
            >
              <span className='mr-4'>{t('postsCarousel.readMore')}</span>
              <span className='-rotate-45 transform transition duration-100 group-hover:rotate-0'>
                <VscArrowRight size={15} />
              </span>
            </UnstyledLink>
          </div>
        </Container>
      </section>
    </>
  );
};
