import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { Container } from '@/components/layout';
import Page from '@/components/layout/Page';
import ProductionSubNav from '@/components/templates/ProductionSubNav';
import { Title } from '@/components/ui';

import ProduktionImg from '/public/images/production/duecker-medizintechnik_production_hero-bg.jpg';

const ProduktUebersicht = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation('services');
  return (
    <Page
      layout={{
        background: 'light',
        showBreadcrumbs: true,
        showHero: false,
        padding: 'none',
        topContent: <ProductionSubNav />,
      }}
      image={ProduktionImg}
      seo={{
        title: t('meta.seo.title'),
        description: t('meta.seo.description'),
      }}
      title={t('meta.pageTitle')}
    >
      <section className='pb-16 md:pb-24 lg:pb-32'>
        <Container>
          <Title>Product Overview</Title>
        </Container>
      </section>
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'services'])),
    },
  };
};

export default ProduktUebersicht;
