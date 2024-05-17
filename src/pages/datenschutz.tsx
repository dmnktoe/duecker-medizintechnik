import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import Seo from '@/components/helpers/Seo';
import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import PrivacyContent from '@/components/templates/PrivacyContent';

const PrivacyPage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation('privacy');
  return (
    <Layout>
      <Seo
        templateTitle={t('meta.pageTitle')}
        description={t('meta.seo.description')}
        title={t('meta.seo.title')}
      />
      <main className='py-16 md:py-24'>
        <Container className='max-w-4xl'>
          <h1 className='mb-8'>{t('content.title')}</h1>
          <PrivacyContent />
        </Container>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'privacy'])),
    },
  };
};

export default PrivacyPage;
