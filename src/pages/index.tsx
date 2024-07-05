import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import { fetchAPI } from '@/lib/fetch-api';
import { generateHreflangTags } from '@/lib/hreflang';

import Page from '@/components/layout/Page';
import { BentoSection } from '@/components/templates/Bento';
import { Features } from '@/components/templates/Features';
import { Hero } from '@/components/templates/Hero';
import { NewsSlider } from '@/components/templates/NewsSlider';
import { StickyScroll } from '@/components/templates/StickyScroll/StickyScroll';

import i18nextConfig from '../../next-i18next.config';

const Startseite = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation('home');
  const posts = props.posts;
  return (
    <Page
      layout={{
        background: 'light',
        showBreadcrumbs: false,
        showHero: false,
        padding: 'tiny',
      }}
      seo={{
        title: t('meta.seo.title'),
        description: t('meta.seo.description'),
        hreflangs: props.hreflangs,
      }}
      title={t('meta.pageTitle')}
    >
      <Hero />
      <Features />
      <StickyScroll />
      <BentoSection />
      <NewsSlider posts={posts} />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const posts = await fetchAPI(
    '/posts?sort=id:desc&populate=deep&pagination[pageSize]=8',
  );

  const locales = i18nextConfig.i18n.locales;
  const currentPath = params?.slug ? `/${params.slug}` : '/';

  const hreflangs = generateHreflangTags(locales, currentPath);

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'home'])),
      posts: posts.data,
      hreflangs,
    },
  };
};

export default Startseite;
