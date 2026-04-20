import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import * as React from 'react';

import { getAlternates } from '@/lib/hreflang';
import { sitePageMetadata } from '@/lib/site-page-metadata';

import Layout from '@/components/layout/Layout';
import NotFound from '@/components/templates/NotFound';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'notFound' });
  return sitePageMetadata({
    title: t('meta.seo.title'),
    description: t('meta.seo.description'),
    alternates: getAlternates('/', locale),
  });
}

export default async function LocaleNotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'notFound' });

  return (
    <Layout>
      <main title={t('meta.pageTitle')}>
        <NotFound />
      </main>
    </Layout>
  );
}
