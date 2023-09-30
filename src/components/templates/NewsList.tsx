import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { formatDate, getStrapiMedia } from '@/lib/helper';

import { AspectRatio } from '@/components/ui/AspectRatio';
import ArrowLink from '@/components/ui/links/ArrowLink';
import UnstyledLink from '@/components/ui/links/UnstyledLink';
import { Title } from '@/components/ui/typography/Title';

import { Data } from '@/interfaces/model';

interface NewsListProps {
  posts: Data[];
}

export const NewsList = (props: NewsListProps) => {
  const { posts } = props;
  const { t } = useTranslation('news');
  return (
    <>
      <ul className='divide-y divide-gray-200'>
        {posts.map((post: Data) => (
          <li className='py-12' key={post.id}>
            <article>
              <div className='group md:flex md:flex-row md:items-center md:justify-center md:gap-x-16 md:align-middle'>
                <div className='mb-10 md:mb-0 md:w-4/12'>
                  <UnstyledLink
                    href={`/news/${post.attributes.slug}`}
                    className='block'
                  >
                    <AspectRatio ratio={9 / 11} className='bg-muted'>
                      <Image
                        src={getStrapiMedia(
                          post.attributes.image.data?.attributes.url ?? '',
                        )}
                        blurDataURL={getStrapiMedia(
                          post.attributes.image.data?.attributes.url ?? '',
                        )}
                        alt={post.attributes.image.data?.attributes.name ?? ''}
                        fill
                        className='rounded-3xl object-cover object-center md:shadow-md'
                      />
                    </AspectRatio>
                  </UnstyledLink>
                </div>
                <div className='flex md:w-8/12 flex-col gap-4'>
                  <div className='flex flex-row items-center gap-x-4'>
                    <span className='border-1.5 bg-primary-800/20 inline-block rounded-full border-black px-3 py-2 text-sm leading-none text-black transition duration-200'>
                      {post.attributes.category}
                    </span>
                    <span className='text-gray-300'>|</span>
                    <span className='text-gray-600'>
                      {formatDate(post.attributes.publishedAt)}
                    </span>
                  </div>
                  <UnstyledLink
                    href={`/news/${post.attributes.slug}`}
                    className='block'
                  >
                    <Title
                      size='three'
                      margin={false}
                      className='text-2xl text-dark transition duration-100 group-hover:text-gray-700'
                    >
                      {post.attributes.title}
                    </Title>
                  </UnstyledLink>
                  <p
                    className='text-base line-clamp-4 md:line-clamp-3'
                    dangerouslySetInnerHTML={{
                      __html: post.attributes.content,
                    }}
                  />
                  <ArrowLink
                    as={UnstyledLink}
                    className='inline-flex items-center'
                    href={`/news/${post.attributes.slug}`}
                  >
                    {t('newsList.readMore')}
                  </ArrowLink>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
};
