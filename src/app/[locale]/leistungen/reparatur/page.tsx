import type { Metadata } from 'next';
import * as React from 'react';

import { getTranslation } from '@/i18n/server';
import { getAlternates } from '@/lib/hreflang';

import { ReparaturContent } from './_content';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, 'repair');
  return {
    title: t('meta.seo.title'),
    description: t('meta.seo.description'),
    alternates: getAlternates('/leistungen/reparatur', locale),
  };
}

export default async function ReparaturPage({ params }: Props) {
  const { locale } = await params;
  const { t } = await getTranslation(locale, 'repair');
  return <ReparaturContent title={t('meta.pageTitle')} />;
}
