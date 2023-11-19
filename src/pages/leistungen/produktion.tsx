import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { VscArrowRight, VscCheck } from 'react-icons/vsc';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';
import ImageBanner from '@/components/templates/ImageBanner/ImageBanner';
import { AspectRatio } from '@/components/ui/AspectRatio';
import NextBreadcrumb from '@/components/ui/Breadcrumb';
import UnstyledLink from '@/components/ui/links/UnstyledLink';
import { Title } from '@/components/ui/typography/Title';

import heroImg from '/public/images/production/duecker-medizintechnik_production_hero-bg.jpg';

const ProductionPage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation('production');
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
                <Title isAnimated>{t('content.title1')}</Title>
                <p className='text-base'>{t('content.text1')}</p>
                <h5 className='my-6 font-semibold'>
                  {t('content.list.title')}
                </h5>
                <ul className='mb-6'>
                  <li className='mb-3 flex items-center'>
                    <VscCheck className='mr-4 h-4 w-4 text-primary-500' />
                    <span>{t('content.list.items.1.label')}</span>
                  </li>
                  <li className='mb-3 flex items-center'>
                    <VscCheck className='mr-4 h-4 w-4 text-primary-500' />
                    <span>{t('content.list.items.2.label')}</span>
                  </li>
                  <li className='flex items-center'>
                    <VscCheck className='mr-4 h-4 w-4 text-primary-500' />
                    <span>{t('content.list.items.3.label')}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className='w-full lg:w-1/3 xl:w-1/2'>
              <div className='md:pl-5'>
                <AspectRatio ratio={1}>
                  <Image
                    src='/images/production/duecker-medizintechnik_production_grid-bg.jpg'
                    width={2000}
                    height={2000}
                    className='object-cover object-center '
                    alt=''
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
          <div className='flex flex-col-reverse gap-6 lg:flex-row'>
            <div className='w-full xl:w-1/2'>
              <div className='flex h-full flex-wrap'>
                <div className='mb-4 w-full md:mb-0 md:w-1/2'>
                  <div className='flex h-full flex-col'>
                    <a
                      className='relative mb-4 block h-full bg-primary-50 px-8 pb-5 pt-8 transition duration-200 hover:bg-primary-100'
                      href='#'
                    >
                      <div className='flex h-full max-w-sm flex-col justify-between pr-16'>
                        <p className='mb-10 text-sm text-gray-900 md:mb-6'>
                          {t('content.boxes.1.text')}
                        </p>
                        <span className='text-3xl font-semibold text-gray-900'>
                          {t('content.boxes.1.title')}
                        </span>
                      </div>
                    </a>
                    <UnstyledLink
                      className='relative block h-full bg-purple-50 px-8 pb-5 pt-8 transition duration-200 hover:bg-purple-100'
                      href='/downloads'
                    >
                      <div className='flex h-full max-w-sm flex-col justify-between pr-16'>
                        <p className='mb-10 text-sm text-gray-900 md:mb-6'>
                          {t('content.boxes.2.text')}
                        </p>
                        <span className='text-3xl font-semibold text-gray-900'>
                          {t('content.boxes.2.title')}
                        </span>
                      </div>
                    </UnstyledLink>
                  </div>
                </div>
                <div className='w-full md:w-1/2 md:pl-4'>
                  <a
                    className='relative block h-full bg-gray-50 px-8 pb-5 pt-8 transition duration-200 hover:bg-gray-100'
                    href='#'
                  >
                    <div className='flex h-full max-w-sm flex-col items-start justify-between pr-16'>
                      <p className='mb-10 text-sm text-gray-900 md:mb-6'>
                        {t('content.boxes.3.text')}
                      </p>
                      <span className='text-3xl font-semibold text-gray-900'>
                        {t('content.boxes.3.title')}
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className='w-full lg:px-4 xl:mb-0 xl:w-1/2'>
              <Title>{t('content.title2')}</Title>
              <p className='mb-3'>{t('content.text2')}</p>
              <p className='font-semibold text-dark'>{t('content.text3')}</p>
            </div>
          </div>
        </Container>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'de', ['common', 'production'])),
  },
});

export default ProductionPage;
