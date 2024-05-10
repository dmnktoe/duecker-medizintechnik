import { marked } from 'marked';
import Image from 'next/image';
import React from 'react';
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

import { formatDate, getStrapiMedia } from '@/lib/helper';

import { Container } from '@/components/layout';
import { AspectRatio } from '@/components/ui/AspectRatio';
import Badge from '@/components/ui/Badges/Badge';
import UnstyledLink from '@/components/ui/Links/UnstyledLink';
import { Body, Title } from '@/components/ui/Typography';

import { company } from '@/constant/company';
import { Data } from '@/interfaces/Data';

type NewsArticleProps = {
  post: Data;
};

export const NewsArticle = ({ post }: NewsArticleProps) => {
  const [isCopied, setIsCopied] = React.useState(false);

  const ArticleHeader = ({ post }: { post: Data }) => {
    return (
      <div className='mx-auto flex w-full max-w-3xl flex-col gap-y-4'>
        <ArticleMeta post={post} />
        <ArticleTitle post={post} />
        <ArticleExcerpt post={post} />
        <ShareButtons />
      </div>
    );
  };

  const ArticleMeta = ({ post }: { post: Data }) => {
    return (
      <div className='flex flex-row items-center gap-x-4'>
        <Badge color='dark' size='md' variant='outline'>
          {post.attributes.category}
        </Badge>
        <span className='text-gray-300'>|</span>
        <span className='text-gray-600'>
          {formatDate(post.attributes.publishedAt)}
        </span>
      </div>
    );
  };

  const ArticleTitle = ({ post }: { post: Data }) => {
    return (
      <Title margin={false} className='text-dark' isAnimated>
        {post.attributes.title}
      </Title>
    );
  };

  const ArticleExcerpt = ({ post }: { post: Data }) => {
    return (
      <Body size='lg' margin={false} className='font-medium'>
        {post.attributes.excerpt}
      </Body>
    );
  };

  const ShareButtons = () => {
    const getPostUrl = () => {
      return `${company.url}/news/${post.attributes.slug}`;
    };

    const shareButtonProps = {
      url: getPostUrl(),
      title: post.attributes.title,
      className:
        'mr-2 transition-colors duration-200 ease-in-out text-gray-500 hover:text-dark',
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
              navigator.clipboard
                .writeText(shareButtonProps.url)
                .then((r) => r);
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 2000);
            }}
          >
            <VscLink {...shareButtonProps} />
          </button>
          {isCopied && <span className='text-xs'>Kopiert!</span>}
        </div>
      </div>
    );
  };

  const ArticleImage = ({ post }: { post: Data }) => {
    return (
      <div className='relative mx-auto w-full max-w-5xl'>
        {post.attributes.image.data?.attributes.name && (
          <AspectRatio ratio={16 / 9} className='bg-muted'>
            <Image
              src={getStrapiMedia(
                post.attributes.image.data?.attributes.url ?? '',
              )}
              blurDataURL={getStrapiMedia(
                post.attributes.image.data?.attributes.url ?? '',
              )}
              placeholder='blur'
              alt={post.attributes.title}
              fill
              className='object-cover object-center'
            />
          </AspectRatio>
        )}
        <div className='mt-3 text-right font-secondary text-sm text-light-gray'>
          {post.attributes.image.data?.attributes.name}
        </div>
      </div>
    );
  };

  const ArticleContent = ({ post }: { post: Data }) => {
    return (
      <div
        className='news__content mx-auto w-full max-w-3xl'
        dangerouslySetInnerHTML={{
          __html: marked(post.attributes.content),
        }}
      />
    );
  };

  const ArticleAuthor = ({ post }: { post: Data }) => {
    return (
      <div className='mx-auto w-full max-w-3xl'>
        <div className='w-2/3 md:w-1/2'>
          <Title size='three'>Kontakt</Title>
          <AspectRatio ratio={16 / 9} className='bg-muted'>
            <Image
              src='https://picsum.photos/800'
              alt='kontakt'
              fill
              className='object-cover object-center'
            />
          </AspectRatio>
          <Body margin={false} className='mt-4 font-medium'>
            Marc Dücker {post.attributes.name}
          </Body>
          <Body size='sm' margin={false} color='light'>
            Executive Vice President Communications & Investor Relations, Dücker
            Medizintechnik
          </Body>
          <UnstyledLink
            className='hover:underline'
            href={'mailto:' + company.email}
          >
            <Body size='sm' margin={false} color='light'>
              {company.email}
            </Body>
          </UnstyledLink>
        </div>
      </div>
    );
  };

  return (
    <section className='bg-gray-100 py-16 md:py-24'>
      <Container>
        <div className='flex flex-col gap-y-8 md:gap-y-12'>
          <ArticleHeader post={post} />
          <ArticleImage post={post} />
          <ArticleContent post={post} />
          <ArticleAuthor post={post} />
        </div>
      </Container>
    </section>
  );
};
