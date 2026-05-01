'use client';

import Image from 'next/image';
import React from 'react';

import clsxm from '@/lib/clsxm';
import { setVisualEditorAttr } from '@/lib/directus-visual-editor';
import { formatDate } from '@/lib/format-date';

import { AspectRatio, Badge, Body, Title, UnstyledLink } from '@/components/ui';

import { News } from '@/types/News';

interface CardProps {
  post: News;
  orientation?: 'horizontal' | 'vertical';
}

const CardImage = ({ post, orientation }: CardProps) => {
  const url = post.image?.url ?? '';
  if (!url) return null;
  return (
    <div
      className={clsxm(
        'relative',
        orientation === 'vertical' && 'mb-6 w-full',
        orientation === 'horizontal' && 'mb-6 w-full md:mb-0 md:w-4/12',
      )}
      data-directus={setVisualEditorAttr({
        collection: 'posts',
        item: post.id,
        fields: 'image',
        mode: 'modal',
      })}
    >
      <AspectRatio ratio={orientation === 'vertical' ? 16 / 9 : 8 / 10}>
        <Image
          src={url}
          blurDataURL={url}
          alt={post.image?.alt ?? post.title}
          fill
          className='object-cover object-center'
        />
      </AspectRatio>
      <div className='absolute top-0 left-0 h-full w-full group-hover:bg-white/10' />
    </div>
  );
};

const CardHeader = ({ post }: { post: News }) => (
  <div>
    {post.category?.name ? (
      <span
        data-directus={setVisualEditorAttr({
          collection: 'posts',
          item: post.id,
          fields: 'category',
          mode: 'popover',
        })}
      >
        <Badge color='dark' size='sm' variant='ghost' className='mr-3'>
          {post.category.name}
        </Badge>
      </span>
    ) : null}
    <span
      className='font-secondary inline-block text-sm font-medium'
      data-directus={setVisualEditorAttr({
        collection: 'posts',
        item: post.id,
        fields: 'date_published',
        mode: 'popover',
      })}
    >
      {formatDate(post.date_published)}
    </span>
  </div>
);

const CardTitle = ({ post }: { post: News }) => (
  <span
    data-directus={setVisualEditorAttr({
      collection: 'posts',
      item: post.id,
      fields: 'title',
      mode: 'popover',
    })}
  >
    <Title size='three' className='line-clamp-3 group-hover:underline'>
      {post.title}
    </Title>
  </span>
);

const CardExcerpt = ({ post }: { post: News }) => {
  const excerpt = post.excerpt.split(' ').slice(0, 50).join(' ');
  return (
    <span
      data-directus={setVisualEditorAttr({
        collection: 'posts',
        item: post.id,
        fields: 'excerpt',
        mode: 'modal',
      })}
    >
      <Body margin={false} className='line-clamp-3'>
        {excerpt}
      </Body>
    </span>
  );
};

const NewsCard = ({ post, orientation }: CardProps) => {
  return (
    <div className='w-full'>
      <UnstyledLink
        className='group focus:outline-dark block focus:outline-1 focus:outline-offset-4 focus:outline-dashed'
        href={'/newsroom/' + post.slug}
      >
        <div
          className={clsxm(
            'flex',
            orientation === 'vertical'
              ? 'flex-col'
              : 'md:items-top flex-col md:flex-row md:justify-center md:gap-x-16 md:align-middle',
          )}
        >
          <CardImage post={post} orientation={orientation} />
          <div
            className={clsxm(
              'flex flex-col space-y-3 xl:space-y-4',
              orientation === 'vertical'
                ? 'max-w-xl sm:max-w-xs xl:max-w-md'
                : 'w-full md:w-8/12',
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
