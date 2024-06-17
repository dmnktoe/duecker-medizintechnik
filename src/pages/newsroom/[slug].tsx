import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { fetchAPI } from '@/lib/fetch-api';

import { Container } from '@/components/layout/Container';
import Page from '@/components/layout/Page';
import { NewsArticle } from '@/components/templates/NewsArticle';
import { ArrowLink } from '@/components/ui';

import { News } from '@/types/News';

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const result = await fetchAPI('/posts');

  const paths = result.data
    .map((result: News) =>
      locales?.map((locale) => ({
        params: { slug: result.attributes.slug.toString() },
        locale,
      })),
    )
    .flat();
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const posts = await fetchAPI(
    `/posts?filters[slug][$eq]=${params?.slug}&populate=*`,
  );
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'news'])),
      post: posts.data[0],
    },
  };
};

interface PostPageProps extends InferGetStaticPropsType<typeof getStaticProps> {
  post: News;
}

const PostPage = (props: PostPageProps) => {
  const { t } = useTranslation('news');
  const post = props.post;

  const BackToNewsButton = () => {
    return (
      <section className='py-12'>
        <Container>
          <div className='mx-auto flex max-w-3xl'>
            <ArrowLink direction='left' href='/newsroom' className='text-xs'>
              {t('content.newsSlug.back')}
            </ArrowLink>
          </div>
        </Container>
      </section>
    );
  };

  return (
    <Page
      date={post.attributes.publishedAt}
      layout={{
        containerWidth: 'max-w-5xl',
        showBreadcrumbs: false,
        showHero: false,
        padding: 'none',
      }}
      seo={{
        title: post.attributes.title,
        description: post.attributes.excerpt,
      }}
      title={post.attributes.title}
    >
      <BackToNewsButton />
      <NewsArticle post={post} />
    </Page>
  );
};

export default PostPage;
