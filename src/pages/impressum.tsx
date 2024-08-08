import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import { generateHreflangTags } from '@/lib/hreflang';

import Page from '@/components/layout/Page';
import LegalNoticeText from '@/components/templates/LegalNoticeText';

import i18nextConfig from '../../next-i18next.config';

const Impressum = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation('imprint');
  return (
    <Page
      layout={{
        background: 'light',
        containerWidth: 'max-w-5xl',
        showBreadcrumbs: true,
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
      <LegalNoticeText />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const locales = i18nextConfig.i18n.locales;
  const currentPath = '/impressum/';

  const hreflangs = generateHreflangTags(locales, currentPath);
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'imprint'])),
      hreflangs,
    },
  };
};

export default Impressum;
