import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import { fetchAPI } from '@/lib/fetch-api';

import { Container } from '@/components/layout/Container';
import Page from '@/components/layout/Page';
import { NewsList } from '@/components/templates/NewsList';
import { Body, Title } from '@/components/ui';

const Newsroom = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation('news');
  const posts = props.posts;

  return (
    <Page
      layout={{
        background: 'light',
        containerWidth: 'max-w-5xl',
        showBreadcrumbs: true,
        showHero: false,
        padding: 'default',
      }}
      seo={{
        title: t('meta.seo.title'),
        description: t('meta.seo.description'),
      }}
      title={t('meta.pageTitle')}
    >
      <section className='mx-auto mb-16 max-w-5xl'>
        <Container>
          <Title>{t('content.title')}</Title>
          <Body>{t('content.text')}</Body>
          <NewsList posts={posts} />
        </Container>
      </section>
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const posts = await fetchAPI('/posts?sort=id:desc&populate=deep');
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'news'])),
      posts: posts.data,
    },
  };
};

export default Newsroom;
