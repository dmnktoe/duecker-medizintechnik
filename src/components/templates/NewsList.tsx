import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { formatDate, getStrapiMedia } from '@/lib/helper';

import { AspectRatio } from '@/components/ui/AspectRatio';
import Badge from '@/components/ui/Badges/Badge';
import ArrowLink from '@/components/ui/links/ArrowLink';
import UnstyledLink from '@/components/ui/links/UnstyledLink';
import { Title } from '@/components/ui/typography/Title';

import { Data } from '@/interfaces/Data';

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
                        className='object-cover object-center'
                      />
                    </AspectRatio>
                  </UnstyledLink>
                </div>
                <div className='flex flex-col gap-4 md:w-8/12'>
                  <div className='flex flex-row items-center'>
                    <Badge
                      color='dark'
                      size='sm'
                      variant='solid'
                      className='mr-3'
                    >
                      {post.attributes.category}
                    </Badge>
                    <span className='inline-block text-sm font-medium text-dark'>
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
                    className='line-clamp-4 text-base md:line-clamp-3'
                    dangerouslySetInnerHTML={{
                      __html: post.attributes.content,
                    }}
                  />
                  <ArrowLink
                    as={UnstyledLink}
                    className='inline-flex items-center'
                    href={`/news/${post.attributes.slug}`}
                  >
                    {t('content.newsList.readMore')}
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
