'use client';

import * as React from 'react';

import { isFeatureEnabled } from '@/lib/features';

import { Page } from '@/components/layout';
import ProductionIntro from '@/components/templates/ProductionIntro';
import ProductionTiles from '@/components/templates/ProductionTiles';

import { SERVICES_PAGE_HERO } from '@/constants/services-page-hero';

export function ProduktionLeistungenView({ title }: { title: string }) {
  return (
    <Page
      layout={{
        background: 'light',
        showBreadcrumbs: true,
        showHero: false,
        padding: 'small',
      }}
      image={SERVICES_PAGE_HERO['/leistungen/produktion'].image}
      title={title}
    >
      <ProductionIntro />
      {isFeatureEnabled('products_overview') && <ProductionTiles />}
    </Page>
  );
}
