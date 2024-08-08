import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import { generateHreflangTags } from '@/lib/hreflang';

import Page from '@/components/layout/Page';
import DistributionConsult from '@/components/templates/DistributionConsult';
import DistributionIntro from '@/components/templates/DistributionIntro';
import DistributionOptic from '@/components/templates/DistributionOptic';
import DistributionProducts from '@/components/templates/DistributionProducts';

import i18nextConfig from '../../../next-i18next.config';

import VertriebImg from '/public/images/distribution/duecker-medizintechnik_distribution_hero-bg.webp';

const Vertrieb = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation('distribution', { useSuspense: false });

  return (
    <Page
      layout={{
        background: 'light',
        showBreadcrumbs: true,
        showHero: false,
        padding: 'small',
      }}
      image={VertriebImg}
      seo={{
        title: t('meta.seo.title'),
        description: t('meta.seo.description'),
        hreflangs: props.hreflangs,
      }}
      title={t('meta.pageTitle')}
    >
      <DistributionIntro />
      <DistributionOptic />
      <DistributionProducts />
      <DistributionConsult />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const locales = i18nextConfig.i18n.locales;
  const currentPath = '/leistungen/vertrieb/';

  const hreflangs = generateHreflangTags(locales, currentPath);
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', [
        'common',
        'distribution',
      ])),
      hreflangs,
    },
  };
};

export default Vertrieb;
