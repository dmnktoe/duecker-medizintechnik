import type { Metadata } from 'next';
import * as React from 'react';

import Page from '@/components/layout/Page';
import DistributionConsult from '@/components/templates/DistributionConsult';
import DistributionIntro from '@/components/templates/DistributionIntro';
import DistributionOptic from '@/components/templates/DistributionOptic';
import DistributionProducts from '@/components/templates/DistributionProducts';
import { getTranslation } from '@/i18n/server';
import { getAlternates } from '@/lib/hreflang';

import VertriebImg from '/public/images/distribution/duecker-medizintechnik_distribution_hero-bg.webp';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, 'distribution');
  return {
    title: t('meta.seo.title'),
    description: t('meta.seo.description'),
    alternates: getAlternates('/leistungen/vertrieb', locale),
  };
}

export default async function VertriebPage({ params }: Props) {
  const { locale } = await params;
  const { t } = await getTranslation(locale, 'distribution');

  return (
    <Page
      layout={{
        background: 'light',
        showBreadcrumbs: true,
        showHero: false,
        padding: 'small',
      }}
      image={VertriebImg}
      title={t('meta.pageTitle')}
    >
      <DistributionIntro />
      <DistributionOptic />
      <DistributionProducts />
      <DistributionConsult />
    </Page>
  );
}
