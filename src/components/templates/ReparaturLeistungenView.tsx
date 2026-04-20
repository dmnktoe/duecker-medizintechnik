'use client';

import { useFlags } from 'flagsmith/react';
import * as React from 'react';

import Page from '@/components/layout/Page';
import RepairIntro from '@/components/templates/RepairIntro';
import RepairSlideshow from '@/components/templates/RepairSlideshow';

import { SERVICES_PAGE_HERO } from '@/constants/services-page-hero';

export function ReparaturLeistungenView({ title }: { title: string }) {
  const flags = useFlags(['repair_slideshow']);
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
      {flags.repair_slideshow.enabled && <RepairSlideshow />}
    </Page>
  );
}
