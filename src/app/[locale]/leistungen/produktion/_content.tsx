'use client';

import { useFlags } from 'flagsmith/react';
import * as React from 'react';

import Page from '@/components/layout/Page';
import ProductionIntro from '@/components/templates/ProductionIntro';
import ProductionTiles from '@/components/templates/ProductionTiles';

import ProduktionImg from '/public/images/production/duecker-medizintechnik_production_hero-bg.jpg';

export function ProduktionContent({ title }: { title: string }) {
  const flags = useFlags(['products_overview']);
  return (
    <Page
      layout={{
        background: 'light',
        showBreadcrumbs: true,
        showHero: false,
        padding: 'small',
      }}
      image={ProduktionImg}
      title={title}
    >
      <ProductionIntro />
      {flags.products_overview.enabled && <ProductionTiles />}
    </Page>
  );
}
