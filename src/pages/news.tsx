import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import { fetchAPI } from '@/lib/fetch-api';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';
import { NewsList } from '@/components/templates/NewsList';
import { Title } from '@/components/ui/typography/Title';

const NewsPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation('news');
  const posts = props.posts;

  return (
    <Layout>
      <Seo templateTitle={t('seo.title')} description={t('seo.description')} />
      <section className='bg-gray-100 py-16 md:py-24'>
        <Container>
          <div className='mx-auto max-w-5xl '>
            <div className='mb-12 flex flex-col gap-3'>
              <Title size='two' isAnimated margin={false}>
                {t('headline')}
              </Title>
              <p className='text-lg'>{t('subheadline')}</p>
            </div>
            <NewsList posts={posts} />
          </div>
        </Container>
      </section>
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
