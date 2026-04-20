import type { Metadata } from 'next';
import type { StaticImageData } from 'next/image';

import { getBaseUrl } from '@/lib/get-base-url';

import VertriebImg from '/public/images/distribution/duecker-medizintechnik_distribution_hero-bg.webp';
import ProduktionImg from '/public/images/production/duecker-medizintechnik_production_hero-bg.jpg';
import ReparaturImg from '/public/images/repair/duecker-medizintechnik_repair_hero-bg.webp';

export type ServicesPageHref =
  | '/leistungen/produktion'
  | '/leistungen/reparatur'
  | '/leistungen/vertrieb';

export const SERVICES_PAGE_HERO: Record<
  ServicesPageHref,
  { image: StaticImageData; ogPath: string }
> = {
  '/leistungen/produktion': {
    image: ProduktionImg,
    ogPath: '/images/production/duecker-medizintechnik_production_hero-bg.jpg',
  },
  '/leistungen/reparatur': {
    image: ReparaturImg,
    ogPath: '/images/repair/duecker-medizintechnik_repair_hero-bg.webp',
  },
  '/leistungen/vertrieb': {
    image: VertriebImg,
    ogPath:
      '/images/distribution/duecker-medizintechnik_distribution_hero-bg.webp',
  },
};

export const SERVICES_PAGE_HREFS = Object.keys(
  SERVICES_PAGE_HERO,
) as ServicesPageHref[];

export function isServicesPageHref(href: string): href is ServicesPageHref {
  return href in SERVICES_PAGE_HERO;
}

export function openGraphImagesForServicesPage(
  href: ServicesPageHref,
): NonNullable<Metadata['openGraph']>['images'] {
  const base = getBaseUrl().replace(/\/$/, '');
  return [{ url: `${base}${SERVICES_PAGE_HERO[href].ogPath}` }];
}
