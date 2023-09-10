import Image from 'next/image';
import React from 'react';

import { getStrapiMedia } from '@/lib/helper';

import { Container } from '@/components/layout/Container';
import { AspectRatio } from '@/components/ui/AspectRatio';
import PrimaryLink from '@/components/ui/links/PrimaryLink';

import { Data } from '@/interfaces/model';

interface NewsListProps {
  posts: Data[];
}

export const NewsList = (props: NewsListProps) => {
  const { posts } = props;
  return (
    <>
      <section>
        <Container>
          <ul className='mx-auto max-w-5xl divide-y divide-gray-200 dark:divide-gray-700'>
            {posts.map((post: Data) => (
              <li className='py-12' key={post.id}>
                <article className='flex flex-row items-center justify-center gap-x-16 align-middle'>
                  <div className='w-1/5'>
                    <AspectRatio ratio={9 / 11} className='bg-muted'>
                      <Image
                        src={getStrapiMedia(
                          post.attributes.image.data?.attributes.url ?? ''
                        )}
                        blurDataURL={getStrapiMedia(
                          post.attributes.image.data?.attributes.url ?? ''
                        )}
                        alt='Photo by Drew Beamer'
                        fill
                        className='object-cover object-center'
                      />
                    </AspectRatio>
                  </div>
                  <div className='flex w-4/5 flex-col gap-4'>
                    <h2>{post.attributes.title}</h2>
                    <p className='line-clamp-3'>{post.attributes.content}</p>
                    <PrimaryLink href={`/news/${post.attributes.slug}`}>
                      Learn more
                    </PrimaryLink>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
};
