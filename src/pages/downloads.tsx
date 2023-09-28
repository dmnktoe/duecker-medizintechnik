import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';
import ImageBanner from '@/components/templates/ImageBanner/ImageBanner';
import { Title } from '@/components/ui/typography/Title';

import heroImg from '/public/images/downloads/duecker-medizintechnik_downloads_hero-bg.webp';

const DownloadsPage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
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
      <main className='py-16 md:py-24'>
        <Container>
          <Title>Downloads & Zertifikate</Title>
        </Container>
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
