import type { Metadata } from 'next';
import * as React from 'react';

import { getTranslation } from '@/i18n/server';
import { getAlternates } from '@/lib/hreflang';

import { ProduktionContent } from './_content';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, 'production');
  return {
    title: t('meta.seo.title'),
    description: t('meta.seo.description'),
    alternates: getAlternates('/leistungen/produktion', locale),
  };
}

export default async function ProduktionPage({ params }: Props) {
  const { locale } = await params;
  const { t } = await getTranslation(locale, 'production');
  return <ProduktionContent title={t('meta.pageTitle')} />;
}
