import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import { fetchAPI } from '@/lib/fetch-api';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';
import { Features } from '@/components/templates/Features';
import { Intro } from '@/components/templates/Intro';
import { PostsCarousel } from '@/components/templates/PostsCarousel/PostsCarousel';
import { StickyScroll } from '@/components/templates/StickyScroll/StickyScroll';

const HomePage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation('home');
  const posts = props.posts;
  return (
    <Layout>
      <Seo templateTitle={t('seo.title')} description={t('seo.description')} />
      <main>
        <Intro />
        <StickyScroll />
        <Features />
        <PostsCarousel posts={posts} />
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const posts = await fetchAPI(
    '/posts?sort=id:desc&populate=*&pagination[pageSize]=10'
  );
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'home'])),
      posts: posts.data,
    },
  };
};

export default HomePage;
