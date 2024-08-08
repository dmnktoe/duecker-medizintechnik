import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import { getHreflangs } from '@/lib/hreflang';

import Page from '@/components/layout/Page';
import CompanyView from '@/components/templates/CompanyView';

import companyHero from '/public/images/company/duecker-medizintechnik_company_hero.webp';

const Unternehmen = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation('company');
  return (
    <Page
      layout={{
        background: 'light',
        containerWidth: 'max-w-5xl',
        showBreadcrumbs: true,
        showHero: true,
        padding: 'default',
      }}
      image={companyHero}
      seo={{
        title: t('meta.seo.title'),
        description: t('meta.seo.description'),
        hreflangs: props.hreflangs,
      }}
      title={t('meta.pageTitle')}
    >
      <CompanyView />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const hreflangs = getHreflangs('/unternehmen/');

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'company'])),
      hreflangs,
    },
  };
};

export default Unternehmen;
