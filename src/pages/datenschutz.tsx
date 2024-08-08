import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import { getHreflangs } from '@/lib/hreflang';

import Page from '@/components/layout/Page';
import PrivacyContent from '@/components/templates/PrivacyContent';

const Datenschutz = (
  props: InferGetStaticPropsType<typeof getStaticProps>,
): JSX.Element => {
  const { t } = useTranslation('privacy');
  return (
    <Page
      layout={{
        background: 'light',
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
      <PrivacyContent />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const hreflangs = getHreflangs('/datenschutz/');

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'privacy'])),
      hreflangs,
    },
  };
};

export default Datenschutz;
