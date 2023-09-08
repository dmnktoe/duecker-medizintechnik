import { useCallback, useRef } from 'react';
import { VscArrowLeft, VscArrowRight } from 'react-icons/vsc';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Container } from '@/components/layout/Container';
import PostsCarouselCard from '@/components/templates/PostsCarousel/PostsCarouselCard';

import { Post } from '@/interfaces/Post';

type PostsCarouselProps = {
  posts: Post[];
};

export const PostsCarousel = ({ posts }: PostsCarouselProps) => {
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
    <>
      <section className='overflow-hidden bg-neutral-50 py-12 md:py-24'>
        <Container>
          <div className='-mx-4 mb-20 flex flex-wrap items-center'>
            <div className='mb-8 w-full px-4 md:mb-0 md:w-1/2'>
              <h1 className='font-heading text-4xl tracking-tighter lg:text-6xl'>
                Neuigkeiten und Wissenswertes
              </h1>
            </div>
            <div className='w-full px-4 md:w-1/2'>
              <div className='flex items-center justify-end'>
                <button
                  className='sm:h-18 sm:w-18 mr-2 inline-flex h-16 w-16 items-center justify-center rounded-full border border-black text-black transition duration-200 hover:bg-black hover:text-white'
                  onClick={handlePrev}
                >
                  <VscArrowLeft size={26} />
                </button>
                <button
                  className='sm:h-18 sm:w-18 inline-flex h-16 w-16 items-center justify-center rounded-full border border-black text-black transition duration-200 hover:bg-black hover:text-white'
                  onClick={handleNext}
                >
                  <VscArrowRight size={26} />
                </button>
              </div>
            </div>
          </div>
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={20}
            slidesPerView={3}
            ref={swiperElRef}
          >
            <div className='mb-20 flex'>
              {posts.map((post, index) => (
                <SwiperSlide key={index}>
                  <PostsCarouselCard
                    title={post.attributes.title}
                    description={post.attributes.content}
                  />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
          <div className='mt-16 text-center'>
            <a
              className='group inline-flex items-center border-b-2 border-black pb-2 font-medium leading-none'
              href='#'
            >
              <span className='mr-4'>See our blog</span>
              <span className='transform transition duration-100 group-hover:rotate-45'>
                <svg
                  width={11}
                  height={11}
                  viewBox='0 0 11 11'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M9.5 1.5L1.5 9.5'
                    stroke='black'
                    strokeWidth='1.3'
                    strokeMiterlimit={10}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M9.5 8.83571V1.5H2.16429'
                    stroke='black'
                    strokeWidth='1.3'
                    strokeMiterlimit={10}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </span>
            </a>
          </div>
        </Container>
      </section>
    </>
  );
};
