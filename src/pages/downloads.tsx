import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { VscArrowRight } from 'react-icons/vsc';

import Seo from '@/components/helpers/Seo';
import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import { DownloadCenter } from '@/components/templates/DownloadCenter';
import { DownloadText } from '@/components/templates/DownloadText';
import ImageBanner from '@/components/templates/ImageBanner/ImageBanner';
import TextReveal from '@/components/templates/TextReveal';
import NextBreadcrumb from '@/components/ui/Breadcrumb';
import { Body } from '@/components/ui/Typography';
import { Title } from '@/components/ui/Typography/Title';

import heroImg from '/public/images/downloads/duecker-medizintechnik_downloads_hero-bg.webp';

const DownloadsPage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation('downloads');
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
      <main className='pt-16 lg:pt-24'>
        <Container>
          <div className='mx-auto mb-16 max-w-5xl'>
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
            <Title>{t('content.title')}</Title>
            <Body>{t('content.text.intro')}</Body>
            <div className='mt-12 flex flex-col gap-12'>
              <DownloadText />
              <DownloadCenter />
            </div>
          </div>
        </Container>
        <div className='relative z-10 flex min-h-[16rem] w-full items-center justify-center bg-black'>
          <TextReveal text={t('content.textReveal')} />
        </div>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', [
        'common',
        'downloads',
      ])),
    },
  };
};

export default DownloadsPage;
