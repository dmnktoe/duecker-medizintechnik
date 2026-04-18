import type { Metadata } from 'next';
import * as React from 'react';

import Page from '@/components/layout/Page';
import { ContactMap } from '@/components/templates/ContactMap';
import ContactView from '@/components/templates/ContactView';
import { getTranslation } from '@/i18n/server';
import { getAlternates } from '@/lib/hreflang';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, 'contact');
  return {
    title: t('meta.seo.title'),
    description: t('meta.seo.description'),
    alternates: getAlternates('/kontakt', locale),
  };
}

export default async function KontaktPage({ params }: Props) {
  const { locale } = await params;
  const { t } = await getTranslation(locale, 'contact');

  return (
    <Page
      className='overflow-hidden'
      layout={{
        background: 'light',
        containerWidth: 'max-w-5xl',
        showBreadcrumbs: false,
        showHero: false,
        padding: 'none',
        topContent: <ContactMap />,
      }}
      title={t('meta.pageTitle')}
    >
      <ContactView />
    </Page>
  );
}
