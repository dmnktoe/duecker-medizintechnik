import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import * as React from 'react';

import { getAlternates } from '@/lib/hreflang';
import { listPosts } from '@/lib/posts';
import { sitePageMetadata } from '@/lib/site-page-metadata';

import { Container } from '@/components/layout';
import { Page } from '@/components/layout';
import { NewsList } from '@/components/templates/NewsList';
import { Body, Title, UnderlineLink } from '@/components/ui';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams?: { category?: string | string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'news' });
  return sitePageMetadata({
    title: t('meta.seo.title'),
    description: t('meta.seo.description'),
    alternates: getAlternates('/newsroom', locale),
  });
}

export default async function NewsroomPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'news' });
  const posts = await listPosts();

  // Minimal category filter via query parameter so detail-page/category sidebar links
  // have a concrete target without introducing new routes.
  const categoryParam = Array.isArray(searchParams?.category)
    ? searchParams?.category[0]
    : searchParams?.category;
  const selectedCategorySlug = categoryParam?.trim() || null;
  const filteredPosts = selectedCategorySlug
    ? posts.filter((p) => p.category?.slug === selectedCategorySlug)
    : posts;

  const categoryCounts = posts.reduce<
    Record<string, { name: string; count: number }>
  >((acc, post) => {
    const slug = post.category?.slug;
    const name = post.category?.name;
    if (!slug || !name) return acc;
    acc[slug] ??= { name, count: 0 };
    acc[slug].count += 1;
    return acc;
  }, {});

  const categories = Object.entries(categoryCounts)
    .map(([slug, { name, count }]) => ({ slug, name, count }))
    .sort((a, b) =>
      a.name.localeCompare(b.name, locale === 'de' ? 'de-DE' : 'en-US', {
        sensitivity: 'base',
      }),
    );

  return (
    <Page
      layout={{
        background: 'light',
        // Keep breadcrumbs at 5xl (Page uses this value),
        // but allow the page content to be wider.
        containerWidth: 'max-w-5xl',
        showBreadcrumbs: true,
        showHero: false,
        padding: 'default',
      }}
      title={t('meta.pageTitle')}
    >
      <section className='pb-16 md:pb-24'>
        <Container width='max-w-7xl'>
          <Title>{t('content.title')}</Title>
          <Body>{t('content.text')}</Body>
          <div className='mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12'>
            <div className='lg:col-span-9'>
              {selectedCategorySlug ? (
                <div className='mb-6'>
                  <Body size='sm' margin={false} color='light'>
                    {t('content.categories.filterLabel')}{' '}
                    <span className='text-dark font-medium'>
                      {categoryCounts[selectedCategorySlug]?.name ??
                        selectedCategorySlug}
                    </span>{' '}
                    •{' '}
                    <UnderlineLink
                      href={`/${locale}/newsroom`}
                      underline='hover'
                    >
                      {t('content.categories.clearFilter')}
                    </UnderlineLink>
                  </Body>
                </div>
              ) : null}
              <NewsList posts={filteredPosts} />
            </div>
            <aside className='lg:col-span-3'>
              {categories.length ? (
                <div className='rounded-md bg-white p-5'>
                  <div className='mb-4'>
                    <Body isStrong margin={false}>
                      {t('content.categories.title')}
                    </Body>
                    <div className='mt-2 space-y-1'>
                      <div className='h-0.5 w-16 bg-gray-200' />
                      <div className='h-0.5 w-10 bg-gray-200' />
                    </div>
                  </div>
                  <ul className='space-y-2'>
                    {categories.map((cat) => {
                      const isActive = cat.slug === selectedCategorySlug;
                      return (
                        <li
                          key={cat.slug}
                          className='flex items-baseline justify-between gap-4'
                        >
                          <UnderlineLink
                            underline='hover'
                            href={`/${locale}/newsroom?category=${encodeURIComponent(cat.slug)}`}
                            className={
                              isActive ? 'text-primary-500' : undefined
                            }
                          >
                            <Body size='sm' margin={false}>
                              {cat.name}
                            </Body>
                          </UnderlineLink>
                          <Body size='xs' margin={false} color='light'>
                            {cat.count}
                          </Body>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
            </aside>
          </div>
        </Container>
      </section>
    </Page>
  );
}
