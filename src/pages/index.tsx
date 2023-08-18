import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { BlogPosts } from '@/components/templates/BlogPosts';
import { Features } from '@/components/templates/Features';
import { Intro } from '@/components/templates/Intro';
import { StickyScroll } from '@/components/templates/StickyScroll/StickyScroll';

type Props = {
  // Add custom props here
};

const HomePage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <Seo templateTitle='Handel, Produktion, Reperatur für OP-Lösungen und Sterilisierungen' />
      <main>
        <Intro />
        <StickyScroll />
        <Features />
        <BlogPosts />
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'de', [
      'common',
      'cta',
      'footer',
      'header',
      'home',
    ])),
  },
});

export default HomePage;
