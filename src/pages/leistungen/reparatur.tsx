import { useFlags } from 'flagsmith/react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import { generateHreflangTags } from '@/lib/hreflang';

import Page from '@/components/layout/Page';
import RepairIntro from '@/components/templates/RepairIntro';
import RepairSlideshow from '@/components/templates/RepairSlideshow';

import i18nextConfig from '../../../next-i18next.config';

import ReparaturImg from '/public/images/repair/duecker-medizintechnik_repair_hero-bg.webp';

const Reparatur = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation('repair');
  const flags = useFlags(['repair_slideshow']);
  return (
    <Page
      className='overflow-hidden'
      layout={{
        background: 'light',
        showBreadcrumbs: true,
        showHero: true,
        padding: 'small',
      }}
      image={ReparaturImg}
      seo={{
        title: t('meta.seo.title'),
        description: t('meta.seo.description'),
        hreflangs: props.hreflangs,
      }}
      title={t('meta.pageTitle')}
    >
      <RepairIntro />
      {flags.repair_slideshow.enabled && <RepairSlideshow />}
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const locales = i18nextConfig.i18n.locales;
  const currentPath = '/leistungen/reparatur/';

  const hreflangs = generateHreflangTags(locales, currentPath);
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'repair'])),
      hreflangs,
    },
  };
};

export default Reparatur;
