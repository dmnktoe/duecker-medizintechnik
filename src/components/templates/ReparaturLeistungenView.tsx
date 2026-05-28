'use client';

import * as React from 'react';

import { isFeatureEnabled } from '@/lib/features';

import { Page } from '@/components/layout';
import RepairIntro from '@/components/templates/RepairIntro';
import RepairSlideshow from '@/components/templates/RepairSlideshow';

import { SERVICES_PAGE_HERO } from '@/constants/services-page-hero';

export function ReparaturLeistungenView({ title }: { title: string }) {
  return (
    <Page
      className='overflow-hidden'
      layout={{
        background: 'light',
        showBreadcrumbs: true,
        showHero: true,
        padding: 'small',
      }}
      image={SERVICES_PAGE_HERO['/leistungen/reparatur'].image}
      title={title}
    >
      <RepairIntro />
      {isFeatureEnabled('repair_slideshow') && <RepairSlideshow />}
    </Page>
  );
}
