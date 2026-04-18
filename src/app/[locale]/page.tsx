import type { Metadata } from 'next';
import * as React from 'react';

import Page from '@/components/layout/Page';
import { BentoSection } from '@/components/templates/Bento';
import { Features } from '@/components/templates/Features';
import { Hero } from '@/components/templates/Hero';
import { NewsSlider } from '@/components/templates/NewsSlider';
import { StickyScroll } from '@/components/templates/StickyScroll/StickyScroll';
import { getTranslation } from '@/i18n/server';
import { fetchAPI } from '@/lib/fetch-api';
import { getAlternates } from '@/lib/hreflang';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, 'home');
  return {
    title: t('meta.seo.title'),
    description: t('meta.seo.description'),
    alternates: getAlternates('/', locale),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const { t } = await getTranslation(locale, 'home');
  const posts = await fetchAPI(
    '/posts?sort=id:desc&populate=deep&pagination[pageSize]=8',
  );

  return (
    <Page
      layout={{
        background: 'light',
        showBreadcrumbs: false,
        showHero: false,
        padding: 'tiny',
      }}
      title={t('meta.pageTitle')}
    >
      <Hero />
      <Features />
      <StickyScroll />
      <BentoSection />
      <NewsSlider posts={posts.data} />
    </Page>
  );
}
