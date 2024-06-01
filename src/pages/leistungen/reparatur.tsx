import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import Page from '@/components/templates/Page';
import RepairIntro from '@/components/templates/RepairIntro';
import RepairSlideshow from '@/components/templates/RepairSlideshow';

import ReparaturImg from '/public/images/repair/duecker-medizintechnik_repair_hero-bg.webp';

const Reparatur = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation('repair');

  return (
    <Page
      layout={{
        background: 'light',
        showBreadcrumbs: true,
        showHero: true,
        padding: 'default',
      }}
      image={ReparaturImg}
      seo={{
        title: t('meta.seo.title'),
        description: t('meta.seo.description'),
      }}
      title={t('meta.pageTitle')}
    >
      <RepairIntro />
      <RepairSlideshow />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'de', ['common', 'repair'])),
  },
});

export default Reparatur;
