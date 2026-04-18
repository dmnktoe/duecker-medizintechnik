import type { Metadata } from 'next';
import * as React from 'react';

import Page from '@/components/layout/Page';
import CompanyView from '@/components/templates/CompanyView';
import { getTranslations } from 'next-intl/server';
import { getAlternates } from '@/lib/hreflang';

import companyHero from '/public/images/company/duecker-medizintechnik_company_hero.webp';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'company' });
  return {
    title: t('meta.seo.title'),
    description: t('meta.seo.description'),
    alternates: getAlternates('/unternehmen', locale),
  };
}

export default async function UnternehmenPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'company' });

  return (
    <Page
      layout={{
        background: 'light',
        containerWidth: 'max-w-5xl',
        showBreadcrumbs: true,
        showHero: true,
        padding: 'default',
      }}
      image={companyHero}
      title={t('meta.pageTitle')}
    >
      <CompanyView />
    </Page>
  );
}
