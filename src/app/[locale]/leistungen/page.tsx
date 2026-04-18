import type { Metadata } from 'next';
import * as React from 'react';

import Page from '@/components/layout/Page';
import ServicesView from '@/components/templates/ServicesView';
import { getTranslation } from '@/i18n/server';
import { getAlternates } from '@/lib/hreflang';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, 'services');
  return {
    title: t('meta.seo.title'),
    description: t('meta.seo.description'),
    alternates: getAlternates('/leistungen', locale),
  };
}

export default async function LeistungenPage({ params }: Props) {
  const { locale } = await params;
  const { t } = await getTranslation(locale, 'services');

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
      <ServicesView />
    </Page>
  );
}
