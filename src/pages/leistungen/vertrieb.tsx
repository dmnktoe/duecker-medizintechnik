import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import Page from '@/components/layout/Page';
import DistributionConsult from '@/components/templates/DistributionConsult';
import DistributionFeatures from '@/components/templates/DistributionFeatures';
import DistributionIntro from '@/components/templates/DistributionIntro';

import VertriebImg from '/public/images/distribution/duecker-medizintechnik_distribution_hero-bg.webp';

const Vertrieb = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation('distribution', { useSuspense: false });

  return (
    <Page
      layout={{
        background: 'light',
        showBreadcrumbs: true,
        showHero: false,
        padding: 'default',
      }}
      image={VertriebImg}
      seo={{
        title: t('meta.seo.title'),
        description: t('meta.seo.description'),
      }}
      title={t('meta.pageTitle')}
    >
      <DistributionIntro />
      <DistributionFeatures />
      <DistributionConsult />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'de', [
      'common',
      'distribution',
    ])),
  },
});

export default Vertrieb;
