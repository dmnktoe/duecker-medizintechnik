import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { VscArrowRight } from 'react-icons/vsc';

import { fetchAPI } from '@/lib/fetch-api';

import Seo from '@/components/helpers/Seo';
import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import { NewsList } from '@/components/templates/NewsList';
import NextBreadcrumb from '@/components/ui/Breadcrumb';
import { Body, Title } from '@/components/ui/Typography';

const NewsPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation('news');
  const posts = props.posts;

  return (
    <Layout>
      <Seo
        templateTitle={t('meta.pageTitle')}
        description={t('meta.seo.description')}
        title={t('meta.seo.title')}
      />
      <main className='py-16 lg:py-24'>
        <Container>
          <div className='mx-auto max-w-5xl'>
            <NextBreadcrumb
              homeElement='Startseite'
              separator={
                <VscArrowRight className='mr-2 h-5 w-3 md:h-6 md:w-3 lg:h-6 lg:w-4' />
              }
              activeClasses='text-primary-500'
              containerClasses='flex'
              listClasses='hover:underline mr-2'
              capitalizeLinks
              className='mb-6'
            />
          </div>
          <div className='mx-auto mb-16 max-w-5xl'>
            <div className='flex flex-col'>
              <Title>{t('content.title')}</Title>
              <Body>{t('content.text')}</Body>
            </div>
            <NewsList posts={posts} />
          </div>
        </Container>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const posts = await fetchAPI('/posts?sort=id:desc&populate=*');
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'news'])),
      posts: posts.data,
    },
  };
};

export default NewsPage;
