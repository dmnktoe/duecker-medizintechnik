import type { Metadata } from 'next';
import * as React from 'react';

import Page from '@/components/layout/Page';
import ImprintContent from '@/components/templates/LegalNoticeText';
import { getTranslations } from 'next-intl/server';
import { getAlternates } from '@/lib/hreflang';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'imprint' });
  return {
    title: t('meta.seo.title'),
    description: t('meta.seo.description'),
    alternates: getAlternates('/impressum', locale),
  };
}

export default async function ImpressumPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'imprint' });

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
      <ImprintContent />
    </Page>
  );
}
