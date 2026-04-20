import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import * as React from 'react';

import { getAlternates } from '@/lib/hreflang';
import { sitePageMetadata } from '@/lib/site-page-metadata';

import Page from '@/components/layout/Page';
import DistributionConsult from '@/components/templates/DistributionConsult';
import DistributionIntro from '@/components/templates/DistributionIntro';
import DistributionOptic from '@/components/templates/DistributionOptic';
import DistributionProducts from '@/components/templates/DistributionProducts';

import {
  openGraphImagesForServicesPage,
  SERVICES_PAGE_HERO,
} from '@/constants/services-page-hero';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale,
    namespace: 'distribution',
  });
  return sitePageMetadata({
    title: t('meta.seo.title'),
    description: t('meta.seo.description'),
    alternates: getAlternates('/leistungen/vertrieb', locale),
    openGraphImages: openGraphImagesForServicesPage('/leistungen/vertrieb'),
  });
}

export default async function VertriebPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale,
    namespace: 'distribution',
  });

  return (
    <Page
      layout={{
        background: 'light',
        showBreadcrumbs: true,
        showHero: false,
        padding: 'small',
      }}
      image={SERVICES_PAGE_HERO['/leistungen/vertrieb'].image}
      title={t('meta.pageTitle')}
    >
      <DistributionIntro />
      <DistributionOptic />
      <DistributionProducts />
      <DistributionConsult />
    </Page>
  );
}
