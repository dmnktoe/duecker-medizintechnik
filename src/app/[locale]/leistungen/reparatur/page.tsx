import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import * as React from 'react';

import { getAlternates } from '@/lib/hreflang';
import { sitePageMetadata } from '@/lib/site-page-metadata';

import { ReparaturLeistungenView } from '@/components/templates/ReparaturLeistungenView';

import { openGraphImagesForServicesPage } from '@/constants/services-page-hero';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'repair' });
  return sitePageMetadata({
    title: t('meta.seo.title'),
    description: t('meta.seo.description'),
    alternates: getAlternates('/leistungen/reparatur', locale),
    openGraphImages: openGraphImagesForServicesPage('/leistungen/reparatur'),
  });
}

export default async function ReparaturPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'repair' });
  return <ReparaturLeistungenView title={t('meta.pageTitle')} />;
}
