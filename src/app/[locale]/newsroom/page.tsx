import type { Metadata } from 'next';
import * as React from 'react';

import Page from '@/components/layout/Page';
import { NewsList } from '@/components/templates/NewsList';
import { Body, Title } from '@/components/ui';
import { getTranslation } from '@/i18n/server';
import { fetchAPI } from '@/lib/fetch-api';
import { getAlternates } from '@/lib/hreflang';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, 'news');
  return {
    title: t('meta.seo.title'),
    description: t('meta.seo.description'),
    alternates: getAlternates('/newsroom', locale),
  };
}

export default async function NewsroomPage({ params }: Props) {
  const { locale } = await params;
  const { t } = await getTranslation(locale, 'news');
  const posts = await fetchAPI('/posts?sort=id:desc&populate=deep');

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
      <section className='mx-auto mb-16 max-w-5xl'>
        <div className='px-4 md:px-6'>
          <Title>{t('content.title')}</Title>
          <Body>{t('content.text')}</Body>
          <NewsList posts={posts.data} />
        </div>
      </section>
    </Page>
  );
}
