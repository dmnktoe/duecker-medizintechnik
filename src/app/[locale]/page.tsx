import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import * as React from 'react';

import { getAlternates } from '@/lib/hreflang';
import { listPartnerLogos } from '@/lib/partner-logos';
import { listPosts } from '@/lib/posts';
import { sitePageMetadata } from '@/lib/site-page-metadata';

import { Page } from '@/components/layout';
import { BentoSection } from '@/components/templates/Bento';
import { Features } from '@/components/templates/Features';
import { Hero } from '@/components/templates/Hero';
import { NewsSlider } from '@/components/templates/NewsSlider';
import { StickyScroll } from '@/components/templates/StickyScroll/StickyScroll';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'home' });
  return sitePageMetadata({
    title: t('meta.seo.title'),
    description: t('meta.seo.description'),
    alternates: getAlternates('/', locale),
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'home' });
  const posts = await listPosts({ limit: 8 });
  const partnerLogos = await listPartnerLogos();

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
      <Hero partnerLogos={partnerLogos} />
      <Features />
      <StickyScroll />
      <BentoSection />
      <NewsSlider posts={posts} />
    </Page>
  );
}
