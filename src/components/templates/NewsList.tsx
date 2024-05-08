import React from 'react';

import NewsCard from '@/components/templates/NewsCard';

import { Data } from '@/interfaces/Data';

interface NewsListProps {
  posts: Data[];
}

export const NewsList = (props: NewsListProps) => {
  const { posts } = props;
  return (
    <>
      <ul className='divide-y divide-gray-200'>
        {posts.map((post: Data) => (
          <article className='py-12' key={post.id}>
            <NewsCard post={post} orientation='horizontal' />
          </article>
        ))}
      </ul>
    </>
  );
};
