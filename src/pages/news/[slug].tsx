import { marked } from 'marked';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import {
  RiFacebookCircleFill,
  RiLinksFill,
  RiMailFill,
  RiTwitterXFill,
} from 'react-icons/ri';

import { fetchAPI } from '@/lib/fetch-api';
import { formatDate, getStrapiMedia } from '@/lib/helper';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';
import { AspectRatio } from '@/components/ui/AspectRatio';
import ArrowLink from '@/components/ui/links/ArrowLink';

import { Data } from '@/interfaces/model';

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const result = await fetchAPI('/posts');

  const paths = result.data
    .map(
      (result: Data) =>
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
      <Seo templateTitle={post.attributes.title} />
      <section className='bg-gray-100'>
        <div className='mx-auto flex max-w-3xl'>
          <ArrowLink direction='left' href='/news' className='mt-12 text-xs'>
            Zurück zur Übersicht
          </ArrowLink>
        </div>
      </section>
      <section className='bg-gray-100 py-16 md:py-24'>
        <Container>
          <div className='flex flex-col gap-y-16'>
            <div className='mx-auto flex max-w-3xl flex-col gap-y-4'>
              <div className='flex flex-row items-center gap-x-4'>
                <span className='border-1.5 bg-primary-800/20 inline-block rounded-full border-black px-3 py-2 text-sm leading-none text-black transition duration-200'>
                  {post.attributes.category}
                </span>
                <span className='text-gray-300'>|</span>
                <span className='text-gray-600'>
                  {formatDate(post.attributes.publishedAt)}
                </span>
              </div>
              <h1 className='text-dark text-4xl font-bold tracking-tight md:text-5xl md:leading-[1.1]'>
                {post.attributes.title}
              </h1>
              <p className='text-dark line-clamp-3 font-medium tracking-tight md:text-lg'>
                {post.attributes.content}
              </p>
              <div className='mt-3 flex flex-row text-gray-500'>
                <RiTwitterXFill
                  size={20}
                  className='hover:text-dark mr-2 transition-colors duration-200 ease-in-out'
                />
                <RiFacebookCircleFill
                  size={20}
                  className='hover:text-dark mr-2 transition-colors duration-200 ease-in-out'
                />
                <RiMailFill
                  size={20}
                  className='hover:text-dark mr-2 transition-colors duration-200 ease-in-out'
                />
                <RiLinksFill
                  size={20}
                  className='hover:text-dark mr-2 transition-colors duration-200 ease-in-out'
                />
              </div>
            </div>
            <div className='relative mx-auto w-full max-w-5xl'>
              {post.attributes.image.data?.attributes.name && (
                <AspectRatio ratio={16 / 9} className='bg-muted'>
                  <Image
                    src={getStrapiMedia(
                      post.attributes.image.data?.attributes.url ?? '',
                    )}
                    blurDataURL={getStrapiMedia(
                      post.attributes.image.data?.attributes.url ?? '',
                    )}
                    alt='Photo by Drew Beamer'
                    fill
                    className='object-cover object-center'
                  />
                </AspectRatio>
              )}
              <div className='mt-3 text-right text-sm text-gray-500'>
                {post.attributes.image.data?.attributes.name}
              </div>
            </div>
            <div
              className='news__content mx-auto max-w-3xl'
              dangerouslySetInnerHTML={{
                __html: marked(post.attributes.content),
              }}
            />
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default PostPage;
