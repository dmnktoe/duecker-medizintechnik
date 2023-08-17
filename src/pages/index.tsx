import type { InferGetStaticPropsType } from 'next';
import { UserConfig } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import { fetchAPI } from '@/lib/fetch-api';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { BlogPosts } from '@/components/templates/BlogPosts';
import { Features } from '@/components/templates/Features';
import { Intro } from '@/components/templates/Intro';
import { StickyScroll } from '@/components/templates/StickyScroll/StickyScroll';

import { Post } from '@/interfaces/Post';

// eslint-disable-next-line unused-imports/no-unused-vars
type Props = {
  // Add custom props here
};

const HomePage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { posts } = props;
  return (
    <Layout>
      <Seo templateTitle='Handel, Produktion, Reperatur für OP-Lösungen und Sterilisierungen' />
      <main>
        <Intro />
        <StickyScroll />
        <Features />
        <BlogPosts posts={posts} />
      </main>
    </Layout>
  );
};

export const getStaticProps: ({ locale }: { locale: never }) => Promise<{
  revalidate: number;
  props: {
    _nextI18Next?: {
      initialI18nStore: unknown;
      initialLocale: string;
      ns: string[];
      userConfig: UserConfig | null;
    };
    posts: Post[];
  };
}> = async ({ locale }) => {
  const [postsRes] = await Promise.all([fetchAPI('/posts')]);
  return {
    props: {
      posts: postsRes.data,
      ...(await serverSideTranslations(locale ?? 'de', [
        'common',
        'cta',
        'footer',
      ])),
    },
    revalidate: 1,
  };
};

export default HomePage;
