import { useFlags } from 'flagsmith/react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import { getHreflangs } from '@/lib/hreflang';

import Page from '@/components/layout/Page';
import ProductionIntro from '@/components/templates/ProductionIntro';
import ProductionTiles from '@/components/templates/ProductionTiles';

import ProduktionImg from '/public/images/production/duecker-medizintechnik_production_hero-bg.jpg';

const Produktion = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation('production');
  const flags = useFlags(['products_overview']);
  return (
    <Page
      layout={{
        background: 'light',
        showBreadcrumbs: true,
        showHero: false,
        padding: 'small',
      }}
      image={ProduktionImg}
      seo={{
        title: t('meta.seo.title'),
        description: t('meta.seo.description'),
        hreflangs: props.hreflangs,
      }}
      title={t('meta.pageTitle')}
    >
      <ProductionIntro />
      {flags.products_overview.enabled && <ProductionTiles />}
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const hreflangs = getHreflangs('/leistungen/produktion/');

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', [
        'common',
        'production',
      ])),
      hreflangs,
    },
  };
};

export default Produktion;
