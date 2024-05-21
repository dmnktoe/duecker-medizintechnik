import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import { fetchAPI } from '@/lib/fetch-api';

import Seo from '@/components/helpers/Seo';
import Layout from '@/components/layout/Layout';
import { BentoSection } from '@/components/templates/Bento';
import { Features } from '@/components/templates/Features';
import { Hero } from '@/components/templates/Hero';
import { NewsSlider } from '@/components/templates/NewsSlider';
import { StickyScroll } from '@/components/templates/StickyScroll/StickyScroll';

const HomePage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation('home');
  const posts = props.posts;
  return (
    <Layout>
      <Seo
        templateTitle={t('_meta.pageTitle')}
        description={t('_meta.seo.description')}
        title={t('_meta.seo.title')}
      />
      <main>
        <Hero />

        <Features />
        <StickyScroll />
        <BentoSection />
        <NewsSlider posts={posts} />
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const posts = await fetchAPI(
    '/posts?sort=id:desc&populate=*&pagination[pageSize]=8',
  );
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'home'])),
      posts: posts.data,
    },
  };
};

export default HomePage;
