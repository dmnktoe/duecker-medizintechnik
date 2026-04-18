'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import NewsCard from '@/components/templates/NewsCard';
import { Body } from '@/components/ui';

import { News } from '@/types/News';

interface NewsListProps {
  posts: News[] | null;
}

export const NewsList = ({ posts }: NewsListProps) => {
  const t = useTranslations('news');

  if (!posts?.length) {
    return (
      <div className='py-12'>
        <Body color='light'>{t('content.newsList.noResults')}</Body>
      </div>
    );
  }

  return (
    <ul className='divide-y divide-gray-200'>
      {posts.map((post: News) => (
        <article className='py-12' key={post.id}>
          <NewsCard post={post} orientation='horizontal' />
        </article>
      ))}
    </ul>
  );
};
