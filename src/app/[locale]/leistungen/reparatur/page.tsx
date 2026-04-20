import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import * as React from 'react';

import { getAlternates } from '@/lib/hreflang';

import { openGraphImagesForServicesPage } from '@/constants/services-page-hero';

import { ReparaturContent } from './_content';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'repair' });
  return {
    title: t('meta.seo.title'),
    description: t('meta.seo.description'),
    alternates: getAlternates('/leistungen/reparatur', locale),
    openGraph: {
      images: openGraphImagesForServicesPage('/leistungen/reparatur'),
    },
  };
}

export default async function ReparaturPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'repair' });
  return <ReparaturContent title={t('meta.pageTitle')} />;
}
