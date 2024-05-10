'use client';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { VscArrowRight } from 'react-icons/vsc';

import '@dotlottie/react-player/dist/index.css';

import Seo from '@/components/helpers/Seo';
import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import ImageBanner from '@/components/templates/ImageBanner/ImageBanner';
import { AspectRatio } from '@/components/ui/AspectRatio';
import Badge from '@/components/ui/Badges/Badge';
import NextBreadcrumb from '@/components/ui/Breadcrumb';
import { Title } from '@/components/ui/Typography/Title';

import { Partner, partners } from '@/constant/partners';

import heroImg from '/public/images/distribution/duecker-medizintechnik_distribution_hero-bg.webp';

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
          <div className='mb-16 flex flex-col items-start md:flex-row md:gap-6 lg:mb-24'>
            <div className='mb-6 w-full lg:mb-0 lg:w-2/3 xl:w-1/2'>
              <div className='text-dark'>
                <div className='mb-2'>
                  <Badge size='sm' color='secondary' variant='solid'>
                    B2B & B2C
                  </Badge>
                </div>
                <Title isAnimated>{t('content.title')}</Title>
                <p className='text-base'>{t('content.text')}</p>
                <h5 className='my-6 font-semibold'>{t('content.partners')}:</h5>
                <div className='mb-6 grid max-w-md grid-cols-4 items-center gap-6 align-middle text-dark'>
                  {partners.map((partner: Partner) => (
                    <div className='divide-y py-2' key={partner.name}>
                      <partner.image className='w-auto' />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='w-full lg:w-1/3 xl:w-1/2'>
              <div className='md:pl-5'>
                <AspectRatio ratio={1}>
                  <div className='flex h-full bg-gray-100'>
                    <DotLottiePlayer
                      src='./../images/distribution/lp7a683r.lottie'
                      autoplay
                      loop
                    />
                  </div>
                </AspectRatio>
              </div>
            </div>
          </div>
        </Container>
      </main>
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
