import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import { getHreflangs } from '@/lib/hreflang';

import Page from '@/components/layout/Page';
import AgbText from '@/components/templates/AgbText';

const AllgemeineGeschaeftsbedingungen = (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation('termsAndConditions');
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
      <AgbText />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const hreflangs = getHreflangs('/agb/');

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', [
        'common',
        'termsAndConditions',
      ])),
      hreflangs,
    },
  };
};

export default AllgemeineGeschaeftsbedingungen;
