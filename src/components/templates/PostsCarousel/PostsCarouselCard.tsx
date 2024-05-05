import Image from 'next/image';
import React from 'react';

import { formatDate, getStrapiMedia } from '@/lib/helper';

import { AspectRatio } from '@/components/ui/AspectRatio';
import Badge from '@/components/ui/Badge';
import UnstyledLink from '@/components/ui/links/UnstyledLink';
import { Title } from '@/components/ui/typography/Title';

import { Data } from '@/interfaces/Data';

interface CardProps {
  post: Data;
}

const PostsCarouselCard = ({ post }: CardProps) => {
  const BlogExcerpt = ({ content }: { content: string }) => {
    const excerpt = content.split(' ').slice(0, 50).join(' ');
    return (
      <p
        className='line-clamp-3 max-w-sm'
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
    );
  };

  return (
    <div className='w-full md:mr-10 md:max-w-lg md:flex-shrink-0'>
      <UnstyledLink
        className='group block'
        href={'/news/' + post.attributes.slug}
      >
        <div className='relative mb-6 overflow-hidden'>
          <AspectRatio ratio={16 / 11} className='bg-muted'>
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
          <div className='absolute left-0 top-0 h-full w-full transition duration-200 group-hover:bg-white group-hover:bg-opacity-10' />
        </div>
        <div className='max-w-xs sm:max-w-sm'>
          <div className='mb-3'>
            <Badge color='dark' size='sm' variant='solid' className='mr-3'>
              {post.attributes.category}
            </Badge>
            <span className='text-coolGray-600 inline-block text-sm font-medium'>
              {formatDate(post.attributes.publishedAt)}
            </span>
          </div>
          <Title size='three' className='mb-6 line-clamp-3'>
            {post.attributes.title}
          </Title>
          <BlogExcerpt content={post.attributes.excerpt} />
        </div>
      </UnstyledLink>
    </div>
  );
};

export default PostsCarouselCard;
