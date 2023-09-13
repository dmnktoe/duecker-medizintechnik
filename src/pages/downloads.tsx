import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';

const DownloadsPage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation('downloads');
  return (
    <Layout>
      <Seo templateTitle={t('seo.title')} />
      <main className='py-16 md:py-24 min-h-96'>
        sdfsfs sdfs sdf sdf
        <div className='relative'>
          <div className='after:from-primary-500/10 after:to-primary-600/0 after:absolute after:bottom-0 after:-z-10 after:h-[30rem] after:w-full after:rounded-tl-[15rem] after:bg-gradient-to-b'></div>
        </div>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', [
        'common',
        'downloads',
      ])),
    },
  };
};

export default DownloadsPage;
