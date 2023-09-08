import React from 'react';

import UnstyledLink from '@/components/ui/links/UnstyledLink';
import NextImage from '@/components/ui/NextImage';

interface CardProps {
  title: string;
  description: string;
  slug: string;
  category?: string;
  image?: string;
}

const PostsCarouselCard = ({
  title,
  description,
  slug,
  category = 'Category',
  image,
}: CardProps) => {
  return (
    <div className='w-full md:mr-10 md:max-w-lg md:flex-shrink-0'>
      <UnstyledLink className='group block' href={'/news/' + slug}>
        <div className='rounded-4xl relative mb-6 overflow-hidden'>
          <NextImage
            className='block h-72 w-full object-cover'
            src={image}
            alt=''
            layout='fill'
          />
          <div className='absolute left-0 top-0 h-full w-full transition duration-200 group-hover:bg-black group-hover:bg-opacity-10' />
        </div>
        <div className='max-w-xs sm:max-w-md'>
          <div className='mb-3'>
            <span className='border-1.5 mr-6 inline-block rounded-full border-black px-3 py-2 text-sm leading-none text-black transition duration-200 group-hover:bg-black group-hover:text-white'>
              {category}
            </span>
            <span className='text-coolGray-600 inline-block text-sm font-medium'>
              9 min read
            </span>
          </div>
          <h4 className='mb-6 text-3xl tracking-tight sm:text-4xl'>{title}</h4>
          <p className='line-clamp-4 max-w-sm'>{description}</p>
        </div>
      </UnstyledLink>
    </div>
  );
};

export default PostsCarouselCard;
