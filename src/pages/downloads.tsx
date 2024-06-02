import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import Page from '@/components/layout/Page';
import { DownloadCenter } from '@/components/templates/DownloadCenter';
import { DownloadText } from '@/components/templates/DownloadText';
import TextReveal from '@/components/templates/TextReveal';

import DownloadsImg from '/public/images/downloads/duecker-medizintechnik_downloads_hero-bg.webp';

const Downloads = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation('downloads');
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
      }}
      title={t('meta.pageTitle')}
    >
      <DownloadText />
      <DownloadCenter />
      <div className='relative z-10 flex min-h-[16rem] w-full items-center justify-center bg-gray-100'>
        <TextReveal text={t('content.textReveal')} />
      </div>
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', [
        'common',
        'downloads',
      ])),
    },
  };
};

export default Downloads;
