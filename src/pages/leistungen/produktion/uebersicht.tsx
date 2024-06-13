import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image, { StaticImageData } from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Container } from '@/components/layout';
import Page from '@/components/layout/Page';
import ProductionSubNav from '@/components/templates/ProductionSubNav';
import { AspectRatio } from '@/components/ui/AspectRatio';
import { Body, Title } from '@/components/ui/Typography';

import ProduktionImg from '/public/images/production/duecker-medizintechnik_production_hero-bg.jpg';
import Set from '/public/images/production/products/set.jpeg';

const ProduktUebersicht = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation('services');
  const ProductCard = ({
    title,
    description,
    image,
  }: {
    title: string;
    description: string;
    image: StaticImageData;
  }) => {
    return (
      <div className='flex flex-col bg-gray-100 p-4'>
        <AspectRatio ratio={4 / 3} className='mb-6'>
          <Image
            src={image}
            placeholder='blur'
            priority
            alt={title}
            layout='fill'
            objectFit='cover'
          />
        </AspectRatio>
        <Title size='three'>{title}</Title>
        <Body className='lg:w-1/2'>{description}</Body>
      </div>
    );
  };
  return (
    <Page
      layout={{
        background: 'light',
        showBreadcrumbs: true,
        showHero: false,
        padding: 'none',
        topContent: <ProductionSubNav />,
      }}
      image={ProduktionImg}
      seo={{
        title: t('meta.seo.title'),
        description: t('meta.seo.description'),
      }}
      title={t('meta.pageTitle')}
    >
      <section className='pb-16 md:pb-24 lg:pb-32'>
        <Container>
          <Title>Product Overview</Title>
          <Title size='two'>Sets & Steuereinheiten</Title>
          <div className='mb-12 grid grid-cols-1 gap-4 lg:grid-cols-3'>
            <ProductCard title='title' description='description' image={Set} />
            <ProductCard title='title' description='description' image={Set} />
            <ProductCard title='title' description='description' image={Set} />
          </div>
          <Title size='two'>Absaug- und Infiltrationspumpen</Title>
          <Swiper
            modules={[Navigation]}
            navigation
            className='mb-12'
            spaceBetween={15}
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
              1024: {
                slidesPerView: 3,
              },
            }}
            loop={false}
          >
            <div className='flex'>
              <SwiperSlide>
                <ProductCard
                  title='title'
                  description='description'
                  image={Set}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  title='title'
                  description='description'
                  image={Set}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  title='title'
                  description='description'
                  image={Set}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  title='title'
                  description='description'
                  image={Set}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  title='title'
                  description='description'
                  image={Set}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  title='title'
                  description='description'
                  image={Set}
                />
              </SwiperSlide>
            </div>
          </Swiper>
          <Title size='two'>Elektronikmotoren</Title>
          <Swiper
            modules={[Navigation]}
            navigation
            className='mb-12'
            spaceBetween={15}
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
              1024: {
                slidesPerView: 3,
              },
            }}
            loop={false}
          >
            <div className='flex'>
              <SwiperSlide>
                <ProductCard
                  title='title'
                  description='description'
                  image={Set}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  title='title'
                  description='description'
                  image={Set}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  title='title'
                  description='description'
                  image={Set}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  title='title'
                  description='description'
                  image={Set}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  title='title'
                  description='description'
                  image={Set}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  title='title'
                  description='description'
                  image={Set}
                />
              </SwiperSlide>
            </div>
          </Swiper>
        </Container>
      </section>
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', [
        'common',
        'production',
      ])),
    },
  };
};

export default ProduktUebersicht;
