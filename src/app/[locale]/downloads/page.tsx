import type { Metadata } from 'next';
import * as React from 'react';

import Page from '@/components/layout/Page';
import { DownloadCenter } from '@/components/templates/DownloadCenter';
import { DownloadText } from '@/components/templates/DownloadText';
import TextReveal from '@/components/templates/TextReveal';
import { getTranslation } from '@/i18n/server';
import { fetchAPI } from '@/lib/fetch-api';
import { getAlternates } from '@/lib/hreflang';

import DownloadsImg from '/public/images/downloads/duecker-medizintechnik_downloads_hero-bg.webp';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, 'downloads');
  return {
    title: t('meta.seo.title'),
    description: t('meta.seo.description'),
    alternates: getAlternates('/downloads', locale),
  };
}

export default async function DownloadsPage({ params }: Props) {
  const { locale } = await params;
  const { t } = await getTranslation(locale, 'downloads');
  const downloads = await fetchAPI(
    `/downloads?locale=${locale}&sort=id:desc&populate=deep`,
  );

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
      <DownloadCenter downloads={downloads.data} />
      <div className='relative z-10 flex min-h-[16rem] w-full items-center justify-center bg-gray-100'>
        <TextReveal text={t('content.textReveal')} />
      </div>
    </Page>
  );
}
