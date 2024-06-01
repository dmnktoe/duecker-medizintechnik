import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import Page from '@/components/layout/Page';
import ProductionIntro from '@/components/templates/ProductionIntro';
import ProductionSubNav from '@/components/templates/ProductionSubNav';
import ProductionTiles from '@/components/templates/ProductionTiles';

import ProduktionImg from '/public/images/production/duecker-medizintechnik_production_hero-bg.jpg';

const Produktion = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation('production');

  return (
    <Page
      layout={{
        background: 'light',
        showBreadcrumbs: false,
        showHero: false,
        padding: 'none',
      }}
      image={ProduktionImg}
      seo={{
        title: t('meta.seo.title'),
        description: t('meta.seo.description'),
      }}
      title={t('meta.pageTitle')}
    >
      <ProductionSubNav />
      <ProductionIntro />
      <ProductionTiles />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'de', ['common', 'production'])),
  },
});

export default Produktion;
