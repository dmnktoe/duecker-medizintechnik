'use client';

import { useFlags } from 'flagsmith/react';
import { marked } from 'marked';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  RiFacebookCircleFill,
  RiMailFill,
  RiTwitterXFill,
  RiWhatsappLine,
} from 'react-icons/ri';
import { VscLink } from 'react-icons/vsc';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

import { formatDate } from '@/lib/format-date';
import { getBaseUrl } from '@/lib/get-base-url';
import { getStrapiMedia } from '@/lib/strapi-urls';

import { Container } from '@/components/layout';
import { AspectRatio, Badge, Body, Title, UnstyledLink } from '@/components/ui';

import { News } from '@/types/News';

type NewsArticleProps = {
  post: News;
};

export const NewsArticle = ({ post }: NewsArticleProps) => {
  const ArticleHeader = ({ post }: { post: News }) => {
    return (
      <div className='mx-auto flex w-full max-w-3xl flex-col gap-y-4'>
        <ArticleMeta post={post} />
        <ArticleTitle post={post} />
        <ArticleExcerpt post={post} />
        <ShareButtons />
      </div>
    );
  };

  const ArticleMeta = ({ post }: { post: News }) => {
    return (
      <div className='flex flex-row items-center gap-x-4'>
        <Badge color='dark' size='md' variant='outline'>
          {post.attributes.category.data.attributes.name}
        </Badge>
        <span className='text-gray-300'>|</span>
        <span className='font-secondary text-gray-600'>
          {formatDate(post.attributes.publishedAt)}
        </span>
      </div>
    );
  };

  const ArticleTitle = ({ post }: { post: News }) => {
    return (
      <Title margin={false} className='text-dark'>
        {post.attributes.title}
      </Title>
    );
  };

  const ArticleExcerpt = ({ post }: { post: News }) => {
    return (
      <Body size='lg' margin={false} className='font-medium'>
        {post.attributes.excerpt}
      </Body>
    );
  };

  const ShareButtons = () => {
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
      if (!isCopied) return;
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }, [isCopied]);

    const getPostUrl = () => {
      const baseUrl = getBaseUrl();
      return `${baseUrl}/newsroom/${post.attributes.slug}`;
    };

    const shareButtonProps = {
      url: getPostUrl(),
      title: post.attributes.title,
      className: 'mr-2 transition-colors duration-200 ease-in-out text-dark',
      size: 20,
    };

    return (
      <div className='mt-3 flex flex-row'>
        <TwitterShareButton {...shareButtonProps}>
          <RiTwitterXFill />
        </TwitterShareButton>
        <FacebookShareButton {...shareButtonProps}>
          <RiFacebookCircleFill />
        </FacebookShareButton>
        <WhatsappShareButton {...shareButtonProps}>
          <RiWhatsappLine />
        </WhatsappShareButton>
        <EmailShareButton {...shareButtonProps}>
          <RiMailFill />
        </EmailShareButton>
        <div className='flex flex-row items-center'>
          <button
            onClick={() => {
              navigator.clipboard.writeText(shareButtonProps.url);
              setIsCopied(true);
            }}
          >
            <VscLink {...shareButtonProps} />
          </button>
          {isCopied && <span className='text-xs'>Kopiert!</span>}
        </div>
      </div>
    );
  };

  const ArticleImage = ({ post }: { post: News }) => {
    return (
      <div className='relative mx-auto w-full max-w-5xl'>
        <AspectRatio ratio={16 / 9} className='bg-muted'>
          <Image
            src={getStrapiMedia(
              post.attributes.image.data.attributes.url ?? '',
            )}
            blurDataURL={getStrapiMedia(
              post.attributes.image.data.attributes.url ?? '',
            )}
            placeholder='blur'
            alt={post.attributes.title}
            fill
            className='object-cover object-center'
          />
        </AspectRatio>
        <div className='mt-3 text-right font-secondary text-sm text-light-gray'>
          {post.attributes.image.data.attributes.name}
        </div>
      </div>
    );
  };

  const ArticleContent = ({ post }: { post: News }) => {
    return (
      <div
        className='news__content mx-auto w-full max-w-3xl'
        dangerouslySetInnerHTML={{
          __html: marked(post.attributes.content),
        }}
      />
    );
  };

  const ArticleAuthor = ({ post }: { post: News }) => {
    const flags = useFlags(['article_author_bio']);
    return (
      <>
        {flags.article_author_bio.enabled ? (
          <div className='mx-auto w-full max-w-3xl'>
            <div className='w-2/3 md:w-1/2'>
              <Title size='three'>Kontakt</Title>
              {post.attributes.author.data.attributes.image.data?.attributes
                .url ? (
                <AspectRatio ratio={16 / 9} className='bg-muted'>
                  <Image
                    src={getStrapiMedia(
                      post.attributes.author.data.attributes.image.data
                        .attributes.url,
                    )}
                    blurDataURL={getStrapiMedia(
                      post.attributes.author.data.attributes.image.data
                        .attributes.url,
                    )}
                    placeholder='blur'
                    alt={post.attributes.author.data.attributes.name}
                    fill
                    className='object-cover object-center'
                  />
                </AspectRatio>
              ) : null}
              <Body margin={false} className='font-medium'>
                {post.attributes.author.data.attributes.name}
              </Body>
              <Body size='sm' margin={false} color='light'>
                {post.attributes.author.data.attributes.bio}
              </Body>
              <UnstyledLink
                className='hover:underline'
                href={'mailto:' + post.attributes.author.data.attributes.mail}
              >
                <Body size='sm' margin={false} color='light'>
                  {post.attributes.author.data.attributes.mail}
                </Body>
              </UnstyledLink>
            </div>
          </div>
        ) : null}
      </>
    );
  };

  return (
    <article className='pb-16 md:pb-24'>
      <Container>
        <div className='flex flex-col gap-y-8 md:gap-y-12'>
          <ArticleHeader post={post} />
          <ArticleImage post={post} />
          <ArticleContent post={post} />
          <ArticleAuthor post={post} />
        </div>
      </Container>
    </article>
  );
};
