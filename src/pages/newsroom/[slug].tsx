import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { fetchAPI } from '@/lib/fetch-api';
import { formatDate } from '@/lib/helper';

import Seo from '@/components/helpers/Seo';
import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import { NewsArticle } from '@/components/templates/NewsArticle';
import ArrowLink from '@/components/ui/Links/ArrowLink';

import { News } from '@/types/News';

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const result = await fetchAPI('/posts');

  const paths = result.data
    .map(
      (result: News) =>
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
      <section>
        <Container>
          <div className='mx-auto flex max-w-3xl'>
            <ArrowLink
              direction='left'
              href='/newsroom'
              className='mt-8 text-xs md:mt-12'
            >
              {t('content.newsSlug.back')}
            </ArrowLink>
          </div>
        </Container>
      </section>
    );
  };

  return (
    <Layout>
      <Seo
        date={formatDate(post.attributes.publishedAt)}
        description={post.attributes.excerpt}
        image={post.attributes.image.data?.attributes.url}
        templateTitle={post.attributes.title}
      />
      <BackToNewsButton />
      <NewsArticle post={post} />
    </Layout>
  );
};

export default PostPage;
