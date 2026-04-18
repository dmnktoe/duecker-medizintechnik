import * as React from 'react';

import Page from '@/components/layout/Page';
import NotFound from '@/components/templates/NotFound';

export default function LocaleNotFound() {
  return (
    <Page
      layout={{
        background: 'light',
        showBreadcrumbs: false,
        showHero: false,
        padding: 'none',
      }}
      title='Seite nicht gefunden'
    >
      <NotFound />
    </Page>
  );
}
