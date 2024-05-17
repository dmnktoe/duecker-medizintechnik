import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import Seo from '@/components/helpers/Seo';
import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import PrivacyContent from '@/components/templates/PrivacyContent';
import { Body, Title } from '@/components/ui/Typography';

/**
 * PrivacyPage component.
 * This is a page component for the privacy policy.
 *
 * @param {InferGetStaticPropsType<typeof getStaticProps>} _props - The props inferred from getStaticProps.
 * @returns {JSX.Element} The rendered JSX element.
 */
const PrivacyPage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
): JSX.Element => {
  const { t } = useTranslation('privacy');
  return (
    <Layout>
      <Seo
        description={t('_meta.seo.description')}
        templateTitle={t('_meta.pageTitle')}
        title={t('_meta.seo.title')}
      />
      <main className='py-16 md:py-24'>
        <Container className='max-w-4xl'>
          <div className='mb-12'>
            <Title>{t('content.title')}</Title>
            <Body>{t('content.text')}</Body>
          </div>
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
