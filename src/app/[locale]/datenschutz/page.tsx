import type { Metadata } from 'next';
import * as React from 'react';

import Page from '@/components/layout/Page';
import PrivacyContent from '@/components/templates/PrivacyContent';
import { getTranslation } from '@/i18n/server';
import { getAlternates } from '@/lib/hreflang';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, 'privacy');
  return {
    title: t('meta.seo.title'),
    description: t('meta.seo.description'),
    alternates: getAlternates('/datenschutz', locale),
  };
}

export default async function DatenschutzPage({ params }: Props) {
  const { locale } = await params;
  const { t } = await getTranslation(locale, 'privacy');

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
      <PrivacyContent />
    </Page>
  );
}
