import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import * as React from 'react';

import { fetchAPI } from '@/lib/fetch-api';
import { getAlternates } from '@/lib/hreflang';
import { sitePageMetadata } from '@/lib/site-page-metadata';
import { getStrapiMedia } from '@/lib/strapi-urls';

import { Container } from '@/components/layout/Container';
import Page from '@/components/layout/Page';
import { NewsArticle } from '@/components/templates/NewsArticle';
import { ArrowLink } from '@/components/ui';

import { i18nConfig } from '@/i18n/settings';

import { News } from '@/types/News';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const result = await fetchAPI<{ data: News[] }>('/posts');
  return result.data.flatMap((post: News) =>
    i18nConfig.locales.map((locale) => ({
      locale,
      slug: post.attributes.slug.toString(),
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'news' });
  const posts = await fetchAPI<{ data: News[] }>(
    `/posts?filters[slug][$eq]=${slug}&populate=deep`,
  );
  const post = posts.data[0];
  if (!post) {
    return sitePageMetadata({
      title: t('meta.seo.fallbackArticleTitle'),
      description: t('meta.seo.description'),
      alternates: getAlternates(`/newsroom/${slug}`, locale),
    });
  }
  const coverUrl = post.attributes.image?.data?.attributes?.url;
  const openGraphImages = coverUrl
    ? [{ url: getStrapiMedia(coverUrl) }]
    : undefined;

  return sitePageMetadata({
    title: post.attributes.title,
    description: post.attributes.excerpt,
    alternates: getAlternates(`/newsroom/${slug}`, locale),
    openGraphImages,
  });
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'news' });
  const posts = await fetchAPI<{ data: News[] }>(
    `/posts?filters[slug][$eq]=${slug}&populate=deep`,
  );
  const post: News = posts.data[0];

  return (
    <Page
      layout={{
        background: 'light',
        showBreadcrumbs: false,
        showHero: false,
        padding: 'none',
      }}
      title={post.attributes.title}
    >
      <section className='py-12'>
        <Container>
          <div className='mx-auto flex max-w-3xl'>
            <ArrowLink
              direction='left'
              href={`/${locale}/newsroom`}
              className='text-xs'
            >
              {t('content.newsSlug.back')}
            </ArrowLink>
          </div>
        </Container>
      </section>
      <NewsArticle post={post} />
    </Page>
  );
}
