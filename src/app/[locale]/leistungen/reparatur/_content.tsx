'use client';

import { useFlags } from 'flagsmith/react';
import * as React from 'react';

import Page from '@/components/layout/Page';
import RepairIntro from '@/components/templates/RepairIntro';
import RepairSlideshow from '@/components/templates/RepairSlideshow';

import ReparaturImg from '/public/images/repair/duecker-medizintechnik_repair_hero-bg.webp';

export function ReparaturContent({ title }: { title: string }) {
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
      image={ReparaturImg}
      title={title}
    >
      <RepairIntro />
      {flags.repair_slideshow.enabled && <RepairSlideshow />}
    </Page>
  );
}
