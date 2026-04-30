'use client';

import { useFlags } from 'flagsmith/react';
import { marked } from 'marked';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { useEffect, useMemo, useState } from 'react';
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

import { setVisualEditorAttr } from '@/lib/directus-visual-editor';
import { formatDate } from '@/lib/format-date';
import { getBaseUrl } from '@/lib/get-base-url';

import { Container } from '@/components/layout';
import { AspectRatio, Badge, Body, Title, UnstyledLink } from '@/components/ui';

import { News } from '@/types/News';

type NewsArticleProps = {
  post: News;
};

function looksLikeHtml(input: string): boolean {
  // Heuristic: treat as HTML if it contains at least one tag.
  // This avoids running HTML through `marked()` (which is intended for Markdown).
  return /<\/?[a-z][\s\S]*>/i.test(input);
}

function sanitizeHtmlUnsafeButBetterThanNothing(html: string): string {
  // We can't rely on external deps in all runtimes here, so keep a conservative,
  // dependency-free sanitizer. This is primarily to strip obvious XSS vectors.
  //
  // If you later add user-generated content, replace this with DOMPurify (or
  // sanitize-html) in a server/client compatible way.
  let out = html;

  // Remove dangerous elements entirely.
  out = out.replace(
    /<(script|style|iframe|object|embed|link|meta)\b[\s\S]*?>[\s\S]*?<\/\1\s*>/gi,
    '',
  );
  out = out.replace(/<(script|style|iframe|object|embed|link|meta)\b[\s\S]*?>/gi, '');

  // Remove inline event handlers and a few high-risk attributes.
  out = out.replace(/\son\w+\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi, '');
  out = out.replace(/\s(srcdoc)\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi, '');

  // Neutralize javascript: URLs in href/src.
  out = out.replace(
    /\s(href|src)\s*=\s*(["'])\s*javascript:[\s\S]*?\2/gi,
    ' $1=$2#$2',
  );

  return out;
}

function renderPostContent(content: string): string {
  const raw = content ?? '';
  if (!raw) return '';

  const html = looksLikeHtml(raw) ? raw : (marked(raw) as string);
  return sanitizeHtmlUnsafeButBetterThanNothing(html);
}

const ArticleMeta = ({ post }: { post: News }) => (
  <div className='flex flex-row items-center gap-x-4'>
    {post.category?.name ? (
      <span
        data-directus={setVisualEditorAttr({
          collection: 'posts',
          item: post.id,
          fields: 'category',
          mode: 'popover',
        })}
      >
        <Badge color='dark' size='md' variant='outline'>
          {post.category.name}
        </Badge>
      </span>
    ) : null}
    <span className='text-gray-300'>|</span>
    <span
      className='font-secondary text-gray-600'
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

const ArticleTitle = ({ post }: { post: News }) => (
  <span
    data-directus={setVisualEditorAttr({
      collection: 'posts',
      item: post.id,
      fields: 'title',
      mode: 'popover',
    })}
  >
    <Title margin={false} className='text-dark'>
      {post.title}
    </Title>
  </span>
);

const ArticleExcerpt = ({ post }: { post: News }) => (
  <span
    data-directus={setVisualEditorAttr({
      collection: 'posts',
      item: post.id,
      fields: 'excerpt',
      mode: 'modal',
    })}
  >
    <Body size='lg' margin={false} className='font-medium'>
      {post.excerpt}
    </Body>
  </span>
);

type ShareButtonsProps = {
  url: string;
  title: string;
  copiedLabel: string;
  copyLinkLabel: string;
};

const ShareButtons = ({
  url,
  title,
  copiedLabel,
  copyLinkLabel,
}: ShareButtonsProps) => {
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
          <VscLink size={20} className='text-dark mr-2' />
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
  const postUrl = `${baseUrl}/newsroom/${post.slug}`;

  return (
    <div className='mx-auto flex w-full max-w-3xl flex-col gap-y-4'>
      <ArticleMeta post={post} />
      <ArticleTitle post={post} />
      <ArticleExcerpt post={post} />
      <ShareButtons
        url={postUrl}
        title={post.title}
        copiedLabel={copiedLabel}
        copyLinkLabel={copyLinkLabel}
      />
    </div>
  );
};

const ArticleImage = ({ post }: { post: News }) => {
  const url = post.image?.url ?? '';
  if (!url) return null;
  return (
    <div
      className='relative mx-auto w-full max-w-5xl'
      data-directus={setVisualEditorAttr({
        collection: 'posts',
        item: post.id,
        fields: 'image',
        mode: 'modal',
      })}
    >
      <AspectRatio ratio={16 / 9} className='bg-muted'>
        <Image
          src={url}
          blurDataURL={url}
          placeholder='blur'
          alt={post.image?.alt ?? post.title}
          fill
          className='object-cover object-center'
        />
      </AspectRatio>
      {post.image?.alt ? (
        <div className='font-secondary text-light-gray mt-3 text-right text-sm'>
          {post.image.alt}
        </div>
      ) : null}
    </div>
  );
};

const ArticleContent = ({ post }: { post: News }) => (
  // `post.content` comes from Directus and may be either Markdown (legacy) or
  // WYSIWYG HTML. We render both, but avoid passing HTML through `marked()`.
  (() => {
    const html = useMemo(() => renderPostContent(post.content ?? ''), [post.content]);
    return (
      <div
        className='news__content mx-auto w-full max-w-3xl'
        data-directus={setVisualEditorAttr({
          collection: 'posts',
          item: post.id,
          fields: 'content',
          mode: 'modal',
        })}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  })()
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
  if (!post.author) return null;

  const author = post.author;

  return (
    <div className='mx-auto w-full max-w-3xl'>
      <div className='w-2/3 md:w-1/2'>
        <Title size='three'>{contactLabel}</Title>
        {author.image?.url ? (
          <AspectRatio ratio={16 / 9} className='bg-muted'>
            <Image
              src={author.image.url}
              blurDataURL={author.image.url}
              placeholder='blur'
              alt={author.image.alt || author.name}
              fill
              className='object-cover object-center'
            />
          </AspectRatio>
        ) : null}
        <Body margin={false} className='font-medium'>
          {author.name}
        </Body>
        {author.bio ? (
          <Body size='sm' margin={false} color='light'>
            {author.bio}
          </Body>
        ) : null}
        {author.mail ? (
          <UnstyledLink
            className='hover:underline'
            href={'mailto:' + author.mail}
          >
            <Body size='sm' margin={false} color='light'>
              {author.mail}
            </Body>
          </UnstyledLink>
        ) : null}
      </div>
    </div>
  );
};

export const NewsArticle = ({ post }: NewsArticleProps) => {
  const t = useTranslations('news');

  return (
    <article
      className='pb-16 md:pb-24'
      data-directus={setVisualEditorAttr({
        collection: 'posts',
        item: post.id,
      })}
    >
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
