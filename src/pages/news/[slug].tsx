import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { fetchAPI } from '@/lib/fetch-api';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';

export const getStaticPaths = async () => {
  const result = await fetchAPI('/posts?sort=id:desc');
  return {
    paths: result.data.map((result: { slug: { toString: () => never } }) => ({
      params: { slug: result.attributes.slug.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const posts = await fetchAPI(`/posts/${params.id}`);
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'home'])),
      posts: posts.data,
    },
  };
};

const PostPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const posts = props.posts;
  return (
    <Layout>
      <Seo templateTitle='News' description='News' />
      <main>
        <Container>
          <div className='-mx-4 flex flex-wrap'>{posts.attributes.slug}</div>
        </Container>
      </main>
    </Layout>
  );
};

export default PostPage;
