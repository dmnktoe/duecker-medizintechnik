import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import { generateHreflangTags } from '@/lib/hreflang';

import Page from '@/components/layout/Page';
import { ContactMap } from '@/components/templates/ContactMap';
import ContactView from '@/components/templates/ContactView';

import i18nextConfig from '../../next-i18next.config';

const Kontakt = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation('contact');

  return (
    <Page
      className='overflow-hidden'
      layout={{
        background: 'light',
        containerWidth: 'max-w-5xl',
        showBreadcrumbs: false,
        showHero: false,
        padding: 'none',
        topContent: <ContactMap />,
      }}
      seo={{
        title: t('meta.seo.title'),
        description: t('meta.seo.description'),
        hreflangs: props.hreflangs,
      }}
      title={t('meta.pageTitle')}
    >
      <ContactView />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const locales = i18nextConfig.i18n.locales;
  const currentPath = '/kontakt/';

  const hreflangs = generateHreflangTags(locales, currentPath);
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'contact'])),
      hreflangs,
    },
  };
};

export default Kontakt;
