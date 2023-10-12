import Image from 'next/image';
import React from 'react';

import { formatDate, getStrapiMedia } from '@/lib/helper';

import { AspectRatio } from '@/components/ui/AspectRatio';
import UnstyledLink from '@/components/ui/links/UnstyledLink';

import { Data } from '@/interfaces/Data';

interface CardProps {
  post: Data;
}

const PostsCarouselCard = ({ post }: CardProps) => {
  const BlogExcerpt = ({ content }: { content: string }) => {
    const excerpt = content.split(' ').slice(0, 50).join(' ');
    return <p className='line-clamp-3 max-w-sm'>{excerpt}</p>;
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
          <div className='absolute left-0 top-0 h-full w-full transition duration-200 group-hover:bg-black group-hover:bg-opacity-10' />
        </div>
        <div className='max-w-xs sm:max-w-md'>
          <div className='mb-3'>
            <span className='border-1.5 mr-6 inline-block rounded-full border-black px-3 py-2 text-sm leading-none text-black transition duration-200 group-hover:bg-black group-hover:text-white'>
              {post.attributes.category}
            </span>
            <span className='text-coolGray-600 inline-block text-sm font-medium'>
              {formatDate(post.attributes.publishedAt)}
            </span>
          </div>
          <h4 className='mb-6 text-3xl tracking-tight sm:text-4xl'>
            {post.attributes.title}
          </h4>
          <BlogExcerpt content={post.attributes.content} />
        </div>
      </UnstyledLink>
    </div>
  );
};

export default PostsCarouselCard;
