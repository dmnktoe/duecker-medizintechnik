import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import * as React from 'react';

import { getAlternates } from '@/lib/hreflang';
import { listPartnerLogos } from '@/lib/partner-logos';
import { sitePageMetadata } from '@/lib/site-page-metadata';

import Page from '@/components/layout/Page';
import CompanyView from '@/components/templates/CompanyView';

import companyHero from '~/images/company/duecker-medizintechnik_company_hero.webp';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'company' });
  return sitePageMetadata({
    title: t('meta.seo.title'),
    description: t('meta.seo.description'),
    alternates: getAlternates('/unternehmen', locale),
  });
}

export default async function UnternehmenPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'company' });
  const partnerLogos = await listPartnerLogos();

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
      <CompanyView partnerLogos={partnerLogos} />
    </Page>
  );
}
