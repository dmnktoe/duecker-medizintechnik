import Image from 'next/image';
import React from 'react';

import clsxm from '@/lib/clsxm';
import { formatDate, getStrapiMedia } from '@/lib/helper';

import { AspectRatio } from '@/components/ui/AspectRatio';
import Badge from '@/components/ui/Badges/Badge';
import UnstyledLink from '@/components/ui/Links/UnstyledLink';
import { Body, Title } from '@/components/ui/Typography';

import { Data } from '@/interfaces/Data';

interface CardProps {
  post: Data;
  orientation?: 'horizontal' | 'vertical';
}

const CardImage = ({ post, orientation }: CardProps) => {
  return (
    <div
      className={clsxm(
        'relative',
        orientation === 'vertical' && 'mb-6 w-full',
        orientation === 'horizontal' && 'mb-6 w-full md:mb-0 md:w-4/12',
      )}
    >
      <AspectRatio ratio={orientation === 'vertical' ? 16 / 9 : 8 / 10}>
        <Image
          src={getStrapiMedia(post.attributes.image.data?.attributes.url ?? '')}
          blurDataURL={getStrapiMedia(
            post.attributes.image.data?.attributes.url ?? '',
          )}
          alt={post.attributes.image.data?.attributes.name ?? ''}
          fill
          className='object-cover object-center'
        />
      </AspectRatio>
      <div className='absolute left-0 top-0 h-full w-full group-hover:bg-white group-hover:bg-opacity-10' />
    </div>
  );
};

const CardHeader = ({ post }: { post: Data }) => {
  return (
    <>
      <div>
        <Badge color='dark' size='sm' variant='ghost' className='mr-3'>
          {post.attributes.category}
        </Badge>
        <span className='inline-block text-sm font-medium'>
          {formatDate(post.attributes.publishedAt)}
        </span>
      </div>
    </>
  );
};

const CardTitle = ({ post }: { post: Data }) => {
  return (
    <Title size='three' className='line-clamp-3 group-hover:underline'>
      {post.attributes.title}
    </Title>
  );
};

const CardExcerpt = ({ post }: { post: Data }) => {
  const excerpt = post.attributes.excerpt.split(' ').slice(0, 50).join(' ');
  return (
    <Body margin={false} className='line-clamp-3'>
      {excerpt}
    </Body>
  );
};

const NewsCard = ({ post, orientation }: CardProps) => {
  return (
    <div className='w-full'>
      <UnstyledLink
        className='group block focus:outline-dashed focus:outline-1 focus:outline-offset-4 focus:outline-dark'
        href={'/news/' + post.attributes.slug}
      >
        <div
          className={clsxm(
            'flex',
            orientation === 'vertical'
              ? 'flex-col'
              : 'flex-col md:flex-row md:items-center md:justify-center md:gap-x-16 md:align-middle',
          )}
        >
          <CardImage post={post} orientation={orientation} />
          <div
            className={clsxm(
              'flex flex-col space-y-3 xl:space-y-4',
              orientation === 'vertical' ? 'xl:max-w-sm' : 'w-full md:w-8/12',
            )}
          >
            <CardHeader post={post} />
            <CardTitle post={post} />
            <CardExcerpt post={post} />
          </div>
        </div>
      </UnstyledLink>
    </div>
  );
};

export default NewsCard;
