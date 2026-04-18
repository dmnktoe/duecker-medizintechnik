'use client';

import { useFlags } from 'flagsmith/react';
import { marked } from 'marked';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
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

const ArticleMeta = ({ post }: { post: News }) => (
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

const ArticleTitle = ({ post }: { post: News }) => (
  <Title margin={false} className='text-dark'>
    {post.attributes.title}
  </Title>
);

const ArticleExcerpt = ({ post }: { post: News }) => (
  <Body size='lg' margin={false} className='font-medium'>
    {post.attributes.excerpt}
  </Body>
);

type ShareButtonsProps = {
  url: string;
  title: string;
  copiedLabel: string;
  copyLinkLabel: string;
};

const ShareButtons = ({ url, title, copiedLabel, copyLinkLabel }: ShareButtonsProps) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timer = setTimeout(() => setIsCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [isCopied]);

  const shareProps = {
    url,
    title,
    className: 'mr-2 transition-colors duration-200 ease-in-out text-dark',
    size: 20,
  };

  return (
    <div className='mt-3 flex flex-row items-center'>
      <TwitterShareButton {...shareProps}>
        <RiTwitterXFill />
      </TwitterShareButton>
      <FacebookShareButton {...shareProps}>
        <RiFacebookCircleFill />
      </FacebookShareButton>
      <WhatsappShareButton {...shareProps}>
        <RiWhatsappLine />
      </WhatsappShareButton>
      <EmailShareButton {...shareProps}>
        <RiMailFill />
      </EmailShareButton>
      <div className='flex flex-row items-center'>
        <button
          onClick={() => {
            navigator.clipboard.writeText(url);
            setIsCopied(true);
          }}
          aria-label={copyLinkLabel}
        >
          <VscLink size={20} className='mr-2 text-dark' />
        </button>
        {isCopied && <span className='text-xs'>{copiedLabel}</span>}
      </div>
    </div>
  );
};

const ArticleHeader = ({
  post,
  copiedLabel,
  copyLinkLabel,
}: {
  post: News;
  copiedLabel: string;
  copyLinkLabel: string;
}) => {
  const baseUrl = getBaseUrl();
  const postUrl = `${baseUrl}/newsroom/${post.attributes.slug}`;

  return (
    <div className='mx-auto flex w-full max-w-3xl flex-col gap-y-4'>
      <ArticleMeta post={post} />
      <ArticleTitle post={post} />
      <ArticleExcerpt post={post} />
      <ShareButtons
        url={postUrl}
        title={post.attributes.title}
        copiedLabel={copiedLabel}
        copyLinkLabel={copyLinkLabel}
      />
    </div>
  );
};

const ArticleImage = ({ post }: { post: News }) => (
  <div className='relative mx-auto w-full max-w-5xl'>
    <AspectRatio ratio={16 / 9} className='bg-muted'>
      <Image
        src={getStrapiMedia(post.attributes.image.data.attributes.url ?? '')}
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

const ArticleContent = ({ post }: { post: News }) => (
  <div
    className='news__content mx-auto w-full max-w-3xl'
    // Content is sourced from a controlled Strapi CMS — not user-facing input.
    // If user-generated content is added in future, sanitize with DOMPurify.
    dangerouslySetInnerHTML={{
      __html: marked(post.attributes.content) as string,
    }}
  />
);

const ArticleAuthor = ({
  post,
  contactLabel,
}: {
  post: News;
  contactLabel: string;
}) => {
  const flags = useFlags(['article_author_bio']);

  if (!flags.article_author_bio.enabled) return null;

  return (
    <div className='mx-auto w-full max-w-3xl'>
      <div className='w-2/3 md:w-1/2'>
        <Title size='three'>{contactLabel}</Title>
        {post.attributes.author.data.attributes.image.data?.attributes.url ? (
          <AspectRatio ratio={16 / 9} className='bg-muted'>
            <Image
              src={getStrapiMedia(
                post.attributes.author.data.attributes.image.data.attributes
                  .url,
              )}
              blurDataURL={getStrapiMedia(
                post.attributes.author.data.attributes.image.data.attributes
                  .url,
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
  );
};

export const NewsArticle = ({ post }: NewsArticleProps) => {
  const t = useTranslations('news');

  return (
    <article className='pb-16 md:pb-24'>
      <Container>
        <div className='flex flex-col gap-y-8 md:gap-y-12'>
          <ArticleHeader
            post={post}
            copiedLabel={t('content.article.copied')}
            copyLinkLabel={t('content.article.copyLink')}
          />
          <ArticleImage post={post} />
          <ArticleContent post={post} />
          <ArticleAuthor
            post={post}
            contactLabel={t('content.article.authorContact')}
          />
        </div>
      </Container>
    </article>
  );
};
