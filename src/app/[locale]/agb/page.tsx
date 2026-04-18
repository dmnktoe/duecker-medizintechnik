import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import * as React from 'react';

import { getAlternates } from '@/lib/hreflang';

import Page from '@/components/layout/Page';
import AgbContent from '@/components/templates/AgbText';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale,
    namespace: 'termsAndConditions',
  });
  return {
    title: t('meta.seo.title'),
    description: t('meta.seo.description'),
    alternates: getAlternates('/agb', locale),
  };
}

export default async function AgbPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale,
    namespace: 'termsAndConditions',
  });

  return (
    <Page
      layout={{
        background: 'light',
        showBreadcrumbs: true,
        showHero: false,
        padding: 'default',
      }}
      title={t('meta.pageTitle')}
    >
      <AgbContent />
    </Page>
  );
}
