import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import * as React from 'react';

import { getAlternates } from '@/lib/hreflang';
import { listPosts } from '@/lib/posts';
import { sitePageMetadata } from '@/lib/site-page-metadata';

import { Container } from '@/components/layout';
import { Page } from '@/components/layout';
import { NewsList } from '@/components/templates/NewsList';
import { Body, Title } from '@/components/ui';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'news' });
  return sitePageMetadata({
    title: t('meta.seo.title'),
    description: t('meta.seo.description'),
    alternates: getAlternates('/newsroom', locale),
  });
}

export default async function NewsroomPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'news' });
  const posts = await listPosts();

  return (
    <Page
      layout={{
        background: 'light',
        containerWidth: 'max-w-5xl',
        showBreadcrumbs: true,
        showHero: false,
        padding: 'default',
      }}
      title={t('meta.pageTitle')}
    >
      <section className='mx-auto max-w-5xl pb-16 md:pb-24'>
        <Container>
          <Title>{t('content.title')}</Title>
          <Body>{t('content.text')}</Body>
          <NewsList posts={posts} />
        </Container>
      </section>
    </Page>
  );
}
