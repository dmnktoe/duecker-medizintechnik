import { getLocale, getTranslations } from 'next-intl/server';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import NotFound from '@/components/templates/NotFound';

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
