import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import Seo from '@/components/helpers/Seo';
import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/ui/Links/ArrowLink';
import { Title } from '@/components/ui/Typography';

const NotFoundPage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation('notFound');
  return (
    <Layout>
      <Seo
        templateTitle={t('_meta.pageTitle')}
        description={t('_meta.seo.description')}
        title={t('_meta.seo.title')}
      />
      <main className='bg-dark/95 bg-[url(/images/404/bentoBlur.svg)] bg-cover bg-center bg-no-repeat py-64 text-white'>
        <section>
          <div className='flex flex-col items-center justify-center text-center'>
            <div className='mb-0 text-7xl leading-none md:text-[15rem]'>
              404
            </div>
            <Title className='text-white'>
              {t('content.pageNotFound') + '.'}
            </Title>
            <ArrowLink
              direction='left'
              underline='hover'
              className='mt-12 md:text-lg'
              href='/'
            >
              {t('content.returnToHome')}
            </ArrowLink>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'de', ['common', 'notFound'])),
  },
});

export default NotFoundPage;
