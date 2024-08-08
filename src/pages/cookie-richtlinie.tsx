import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import { getHreflangs } from '@/lib/hreflang';

import Page from '@/components/layout/Page';
import CookieControlCenter from '@/components/templates/CookieControlCenter';

const CookieRichtlinie = (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation('cookiePolicy');
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
      <CookieControlCenter />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const hreflangs = getHreflangs('/cookie-richtlinie/');

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', [
        'common',
        'cookiePolicy',
      ])),
      hreflangs,
    },
  };
};

export default CookieRichtlinie;
