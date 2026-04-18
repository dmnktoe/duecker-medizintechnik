import { getLocale, getTranslations } from 'next-intl/server';
import * as React from 'react';

import Page from '@/components/layout/Page';
import NotFound from '@/components/templates/NotFound';

export default async function LocaleNotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'notFound' });

  return (
    <Page
      layout={{
        background: 'light',
        showBreadcrumbs: false,
        showHero: false,
        padding: 'none',
      }}
      title={t('meta.pageTitle')}
    >
      <NotFound />
    </Page>
  );
}
