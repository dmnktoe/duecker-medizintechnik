import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import * as React from 'react';

import { listDownloads } from '@/lib/downloads';
import { getAlternates } from '@/lib/hreflang';
import { sitePageMetadata } from '@/lib/site-page-metadata';

import Page from '@/components/layout/Page';
import { DownloadCenter } from '@/components/templates/DownloadCenter';
import { DownloadText } from '@/components/templates/DownloadText';

import DownloadsImg from '~/images/downloads/duecker-medizintechnik_downloads_hero-bg.webp';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'downloads' });
  return sitePageMetadata({
    title: t('meta.seo.title'),
    description: t('meta.seo.description'),
    alternates: getAlternates('/downloads', locale),
  });
}

export default async function DownloadsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'downloads' });
  const downloads = await listDownloads(locale);

  return (
    <Page
      layout={{
        background: 'light',
        containerWidth: 'max-w-5xl',
        showBreadcrumbs: true,
        showHero: true,
        padding: 'default',
      }}
      image={DownloadsImg}
      title={t('meta.pageTitle')}
    >
      <DownloadText />
      <DownloadCenter downloads={downloads} />
    </Page>
  );
}
