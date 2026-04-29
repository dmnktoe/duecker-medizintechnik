import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getAlternates } from '@/lib/hreflang';
import { getPostBySlug, listPostSlugs } from '@/lib/posts';
import { sitePageMetadata } from '@/lib/site-page-metadata';

import { Container } from '@/components/layout/Container';
import Page from '@/components/layout/Page';
import { NewsArticle } from '@/components/templates/NewsArticle';
import { ArrowLink } from '@/components/ui';

import { i18nConfig } from '@/i18n/settings';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  try {
    const slugs = await listPostSlugs();
    return slugs.flatMap((slug) =>
      i18nConfig.locales.map((locale) => ({ locale, slug })),
    );
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    notFound();
  }
  const openGraphImages = post.image?.url
    ? [{ url: post.image.url }]
    : undefined;

  return sitePageMetadata({
    title: post.title,
    description: post.excerpt,
    alternates: getAlternates(`/newsroom/${slug}`, locale),
    openGraphImages,
  });
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'news' });
  const { isEnabled: isDraft } = await draftMode();
  const post = await getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  return (
    <Page
      layout={{
        background: 'light',
        showBreadcrumbs: false,
        showHero: false,
        padding: 'none',
      }}
      title={post.title}
    >
      <section className='py-12'>
        <Container>
          <div className='mx-auto flex max-w-3xl items-center justify-between gap-4'>
            <ArrowLink
              direction='left'
              href={`/${locale}/newsroom`}
              className='text-xs'
            >
              {t('content.newsSlug.back')}
            </ArrowLink>
            {isDraft ? (
              <a
                href={`/api/draft/disable?redirect=/${locale}/newsroom/${slug}`}
                className='text-primary-500 rounded-full border border-current px-3 py-1 text-xs tracking-wider uppercase'
              >
                Draft Mode aktiv – verlassen
              </a>
            ) : null}
          </div>
        </Container>
      </section>
      <NewsArticle post={post} />
    </Page>
  );
}
