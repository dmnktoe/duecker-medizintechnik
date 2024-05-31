'use client';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { VscArrowRight } from 'react-icons/vsc';

import '@dotlottie/react-player/dist/index.css';

import Seo from '@/components/helpers/Seo';
import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import ImageBanner from '@/components/templates/ImageBanner/ImageBanner';
import ImageScrollEffect from '@/components/templates/ImageScrollEffect';
import { AspectRatio } from '@/components/ui/AspectRatio';
import NextBreadcrumb from '@/components/ui/Breadcrumb';
import { Body } from '@/components/ui/Typography';
import { Title } from '@/components/ui/Typography/Title';

import { Partner, partners } from '@/constant/partners';

import darkBannerImg from '/public/images/distribution/duecker-medizintechnik_distribution_dark-banner-image.jpg';
import heroImg from '/public/images/distribution/duecker-medizintechnik_distribution_hero-bg.webp';
import parallaxImg from '/public/images/distribution/duecker-medizintechnik_distribution_parallax-bg.webp';

const DistributionPage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation('distribution');

  return (
    <Layout>
      <Seo
        templateTitle={t('meta.pageTitle')}
        description={t('meta.seo.description')}
        title={t('meta.seo.title')}
      />
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
            separator={
              <VscArrowRight className='mr-2 h-5 w-3 md:h-6 md:w-3 lg:h-6 lg:w-4' />
            }
            activeClasses='text-primary-500'
            containerClasses='flex'
            listClasses='hover:underline mr-2'
            capitalizeLinks
            className='mb-6'
          />
          <div className='flex flex-col items-start md:flex-row md:gap-16'>
            <div className='mb-12 w-full lg:w-2/3 xl:w-1/2'>
              <div className='text-dark'>
                <Title>{t('content.title')}</Title>
                <Body>{t('content.text')}</Body>
                <Body>{t('content.text')}</Body>
                <Body margin={false}>{t('content.text')}</Body>
              </div>
            </div>
            <div className='w-full lg:w-1/3 xl:w-1/2'>
              <AspectRatio ratio={9 / 12} className='w-full'>
                <Image
                  src={darkBannerImg}
                  alt='Global Distribution Network'
                  fill
                  className='object-cover object-center'
                />
              </AspectRatio>
            </div>
          </div>
        </Container>
      </main>
      <ImageScrollEffect image={heroImg} text={t('content.title')} />
      <section className='bg-black py-16 md:py-24 lg:py-32'>
        <Container>
          <div className='flex flex-col items-center text-white md:flex-row md:gap-16'>
            <div className='w-full lg:w-2/3 xl:w-1/2'>
              <div className='mb-12 lg:mb-0 lg:border lg:border-white/10 lg:p-6'>
                <AspectRatio ratio={1 / 1.1} className='w-full'>
                  <Image
                    src={parallaxImg}
                    alt='Global Distribution Network'
                    fill
                    className='object-cover object-center'
                  />
                </AspectRatio>
              </div>
            </div>
            <div className='w-full lg:w-1/3 xl:w-1/2'>
              <div className='text-white'>
                <Title className='!text-white/90'>{t('content.title')}</Title>
                <Body className='!text-white/60'>{t('content.text')}</Body>
                <hr className='my-12 border-white/10' />
                <div className='lg:max-w-lg'>
                  <div className='mb-6 grid grid-cols-4 items-center gap-x-12 gap-y-6 align-middle'>
                    {partners.map((partner: Partner) => (
                      <div
                        className='divide-y py-2 !text-white/60 transition-all ease-in-out hover:!text-white/90'
                        key={partner.name}
                      >
                        <partner.image className='w-auto' />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'de', [
      'common',
      'distribution',
    ])),
  },
});

export default DistributionPage;
