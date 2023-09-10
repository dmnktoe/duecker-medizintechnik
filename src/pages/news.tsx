import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { fetchAPI } from '@/lib/fetch-api';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';
import { NewsList } from '@/components/templates/NewsList';

const NewsPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const posts = props.posts;
  return (
    <Layout>
      <Seo templateTitle='News' />
      <section className='bg-gray-100 py-16 md:py-24 lg:py-32'>
        <Container>
          <h1>News</h1>
        </Container>
        <NewsList posts={posts} />
      </section>
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
