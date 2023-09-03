import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';
import { BlogPosts } from '@/components/templates/BlogPosts';
import { Features } from '@/components/templates/Features';
import { Intro } from '@/components/templates/Intro';
import { StickyScroll } from '@/components/templates/StickyScroll/StickyScroll';

const HomePage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation('home');
  return (
    <Layout>
      <Seo templateTitle={t('seo.title')} description={t('seo.description')} />
      <main>
        <Intro />
        <StickyScroll />
        <Features />
        <BlogPosts />
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'de', ['common', 'home'])),
  },
});

export default HomePage;
