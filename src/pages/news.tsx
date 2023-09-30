import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { VscArrowRight } from 'react-icons/vsc';

import { fetchAPI } from '@/lib/fetch-api';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';
import { NewsList } from '@/components/templates/NewsList';
import NextBreadcrumb from '@/components/ui/Breadcrumb';
import { Title } from '@/components/ui/typography/Title';

const NewsPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation('news');
  const posts = props.posts;

  return (
    <Layout>
      <Seo templateTitle={t('seo.title')} description={t('seo.description')} />
      <main className='py-16 lg:py-24'>
        <Container>
          <div className='mx-auto max-w-5xl'>
            <NextBreadcrumb
              homeElement='Startseite'
              separator={<VscArrowRight className='h-6 w-3 mr-2' />}
              activeClasses='text-primary-500'
              containerClasses='flex'
              listClasses='hover:underline mr-2'
              capitalizeLinks
              className='mb-6'
            />
          </div>
          <div className='mx-auto mb-16 max-w-5xl'>
            <div className='flex flex-col'>
              <Title margin={false}>{t('headline')}</Title>
              <p>{t('subheadline')}</p>
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
