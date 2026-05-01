import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import * as React from 'react';

import { getAlternates } from '@/lib/hreflang';
import { sitePageMetadata } from '@/lib/site-page-metadata';

import { Page } from '@/components/layout';
import ImprintContent from '@/components/templates/LegalNoticeText';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'imprint' });
  return sitePageMetadata({
    title: t('meta.seo.title'),
    description: t('meta.seo.description'),
    alternates: getAlternates('/impressum', locale),
  });
}

export default async function ImpressumPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'imprint' });

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
      <ImprintContent />
    </Page>
  );
}
