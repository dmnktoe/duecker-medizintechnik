import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import Page from '@/components/layout/Page';
import LegalNoticeText from '@/components/templates/LegalNoticeText';

const Impressum = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
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
      }}
      title={t('meta.pageTitle')}
    >
      <LegalNoticeText />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'imprint'])),
    },
  };
};

export default Impressum;
