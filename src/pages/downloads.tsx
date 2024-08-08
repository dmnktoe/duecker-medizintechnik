import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { fetchAPI } from '@/lib/fetch-api';
import { getHreflangs } from '@/lib/hreflang';

import Page from '@/components/layout/Page';
import { DownloadCenter } from '@/components/templates/DownloadCenter';
import { DownloadText } from '@/components/templates/DownloadText';
import TextReveal from '@/components/templates/TextReveal';

import DownloadsImg from '/public/images/downloads/duecker-medizintechnik_downloads_hero-bg.webp';

const Downloads = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation('downloads');
  const downloads = props.downloads;
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
      seo={{
        title: t('meta.seo.title'),
        description: t('meta.seo.description'),
        hreflangs: props.hreflangs,
      }}
      title={t('meta.pageTitle')}
    >
      <DownloadText />
      <DownloadCenter downloads={downloads} />
      <div className='relative z-10 flex min-h-[16rem] w-full items-center justify-center bg-gray-100'>
        <TextReveal text={t('content.textReveal')} />
      </div>
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const downloads = await fetchAPI(
    `/downloads?locale=${locale}&sort=id:desc&populate=deep`,
  );

  const hreflangs = getHreflangs('/downloads/');

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', [
        'common',
        'downloads',
      ])),
      downloads: downloads.data,
      hreflangs,
    },
  };
};

export default Downloads;
