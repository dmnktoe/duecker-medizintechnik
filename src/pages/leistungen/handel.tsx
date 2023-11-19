'use client';
import { Player } from '@lottiefiles/react-lottie-player';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { VscArrowRight, VscCheck } from 'react-icons/vsc';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';
import ImageBanner from '@/components/templates/ImageBanner/ImageBanner';
import { AspectRatio } from '@/components/ui/AspectRatio';
import Badge from '@/components/ui/Badge';
import NextBreadcrumb from '@/components/ui/Breadcrumb';
import UnderlineLink from '@/components/ui/links/UnderlineLink';
import { Title } from '@/components/ui/typography/Title';

import heroImg from '/public/images/commerce/duecker-medizintechnik_commerce_hero-bg.webp';
import animation from '/public/images/commerce/package-rotate_lottie.json';

const CommercePage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation('commerce');
  const animationURL = animation;

  return (
    <Layout>
      <Seo
        templateTitle={t('meta.seo.title')}
        description={t('meta.seo.description')}
        title={t('meta.pageTitle')}
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
                  <Badge size='lg' color='secondary' variant='solid'>
                    {t('meta.pageTitle')}
                  </Badge>
                </div>
                <Title isAnimated>{t('content.title')}</Title>
                <p className='text-base'>{t('content.text')}</p>
                <h5 className='my-6 font-semibold'>{t('content.partners')}:</h5>
                <ul className='mb-6 flex flex-row gap-6'>
                  <div>
                    <li className='mb-3 flex items-center'>
                      <VscCheck className='mr-4 h-4 w-4 text-primary-500' />
                      <UnderlineLink href='https://medicon.de/'>
                        Medicon
                      </UnderlineLink>
                    </li>
                    <li className='mb-3 flex items-center'>
                      <VscCheck className='mr-4 h-4 w-4 text-primary-500' />
                      <UnderlineLink href='https://www.bissinger-medizintechnik.de/'>
                        Bissinger
                      </UnderlineLink>
                    </li>
                    <li className='flex items-center'>
                      <VscCheck className='mr-4 h-4 w-4 text-primary-500' />
                      <UnderlineLink href='https://medicon.de/'>
                        Eberle
                      </UnderlineLink>
                    </li>
                  </div>
                  <div>
                    <li className='mb-3 flex items-center'>
                      <VscCheck className='mr-4 h-4 w-4 text-primary-500' />
                      <UnderlineLink href='https://medicon.de/'>
                        Hupfer
                      </UnderlineLink>
                    </li>
                    <li className='mb-3 flex items-center'>
                      <VscCheck className='mr-4 h-4 w-4 text-primary-500' />
                      <UnderlineLink href='https://medicon.de/'>
                        Key Surgical
                      </UnderlineLink>
                    </li>
                    <li className='flex items-center'>
                      <VscCheck className='mr-4 h-4 w-4 text-primary-500' />
                      <UnderlineLink href='https://medicon.de/'>
                        Nouvag
                      </UnderlineLink>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
            <div className='w-full lg:w-1/3 xl:w-1/2'>
              <div className='md:pl-5'>
                <AspectRatio ratio={1}>
                  <div className='flex h-full bg-gray-100'>
                    <Player src={animationURL} autoplay loop speed={1} />
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
    ...(await serverSideTranslations(locale ?? 'de', ['common', 'commerce'])),
  },
});

export default CommercePage;
