import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { generateHreflangTags } from '@/lib/hreflang';

import Page from '@/components/layout/Page';
import ServicePageTiles from '@/components/templates/ServicePageTiles';

import i18nextConfig from '../../next-i18next.config';

const Leistungen = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation('services');
  return (
    <Page
      layout={{
        background: 'light',
        containerWidth: 'max-w-5xl',
        showBreadcrumbs: false,
        showHero: false,
        padding: 'default',
      }}
      seo={{
        title: t('meta.seo.title'),
        description: t('meta.seo.description'),
        hreflangs: props.hreflangs,
      }}
      title={t('meta.pageTitle')}
    >
      <ServicePageTiles />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const locales = i18nextConfig.i18n.locales;
  const currentPath = '/leistungen/';

  const hreflangs = generateHreflangTags(locales, currentPath);
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'services'])),
      hreflangs,
    },
  };
};

export default Leistungen;
