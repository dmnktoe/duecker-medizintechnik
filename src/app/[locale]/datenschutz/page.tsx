import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import * as React from 'react';

import { getAlternates } from '@/lib/hreflang';
import { sitePageMetadata } from '@/lib/site-page-metadata';

import Page from '@/components/layout/Page';
import PrivacyContent from '@/components/templates/PrivacyContent';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'privacy' });
  return sitePageMetadata({
    title: t('meta.seo.title'),
    description: t('meta.seo.description'),
    alternates: getAlternates('/datenschutz', locale),
  });
}

export default async function DatenschutzPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'privacy' });

  return (
    <Page
      layout={{
        background: 'light',
        containerWidth: 'max-w-5xl',
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
