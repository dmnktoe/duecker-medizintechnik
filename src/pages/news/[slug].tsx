import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { fetchAPI } from '@/lib/fetch-api';
import { formatDate } from '@/lib/helper';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';

import { Data } from '@/interfaces/model';

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await fetchAPI('/posts');
  return {
    paths: result.data.map((result: Data) => ({
      params: { slug: result.attributes.slug.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const posts = await fetchAPI(`/posts?filters[slug][$eq]=${params?.slug}`);
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'home'])),
      post: posts.data[0],
    },
  };
};

interface PostPageProps extends InferGetStaticPropsType<typeof getStaticProps> {
  post: Data;
}

const PostPage = (props: PostPageProps) => {
  const post = props.post;
  return (
    <Layout>
      <Seo templateTitle='News' description='News' />
      <main>
        <Container>
          {formatDate(post.attributes.publishedAt.toString())}
          <h1>{post.attributes.title}</h1>
        </Container>
      </main>
    </Layout>
  );
};

export default PostPage;
