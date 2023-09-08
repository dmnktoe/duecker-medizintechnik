import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { fetchAPI } from '@/lib/fetch-api';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';

const NewsPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const posts = props.posts;
  return (
    <Layout>
      <Seo templateTitle='News' description='News' />
      <main>
        <Container>
          <h1>News</h1>
          <p>News</p>
          {posts.map((post) => (
            <div key={post.id}>
              <h2>{post.attributes.title}</h2>
              <p>{post.content}</p>
            </div>
          ))}
        </Container>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const posts = await fetchAPI('/posts?sort=id:desc&populate=*');
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'home'])),
      posts: posts.data,
    },
  };
};

export default NewsPage;
