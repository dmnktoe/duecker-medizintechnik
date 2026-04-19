'use client';

import { useTranslations } from 'next-intl';
import * as React from 'react';

import { Body, Title, UnderlineLink } from '@/components/ui';

type CookieVendor = {
  name: string;
  service?: string;
  purpose: string;
  /** If omitted, no external provider privacy link is shown (e.g. purely local storage). */
  privacyUrl?: string;
};

type CookiePolicyVendorListProps = {
  category: 'necessary' | 'measurement' | 'marketing';
};

export function CookiePolicyVendorList({
  category,
}: CookiePolicyVendorListProps) {
  const t = useTranslations('cookiePolicy');
  const vendors = (
    category === 'necessary'
      ? t.raw('content.vendors.necessary')
      : category === 'measurement'
        ? t.raw('content.vendors.measurement')
        : t.raw('content.vendors.marketing')
  ) as CookieVendor[];

  if (!Array.isArray(vendors) || vendors.length === 0) {
    return null;
  }

  return (
    <ul className='mt-4 list-none space-y-6'>
      {vendors.map((vendor, index) => (
        <li
          key={`${vendor.name}-${vendor.service ?? ''}-${index}`}
          className='border-b border-gray-200 pb-6 last:border-0 last:pb-0'
        >
          <Body margin={false} isStrong className='text-dark'>
            {vendor.name}
            {vendor.service ? (
              <span className='font-normal text-light-gray'>
                {' '}
                — {vendor.service}
              </span>
            ) : null}
          </Body>
          <Body margin={false} size='sm' className='mt-2'>
            {vendor.purpose}
          </Body>
          {vendor.privacyUrl ? (
            <UnderlineLink
              href={vendor.privacyUrl}
              underline='hover'
              className='mt-2 inline-block max-w-full break-all text-sm'
            >
              {vendor.privacyUrl}
            </UnderlineLink>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

type CookiePolicyCategorySectionProps = {
  category: CookiePolicyVendorListProps['category'];
};

export function CookiePolicyCategorySection({
  category,
}: CookiePolicyCategorySectionProps) {
  const t = useTranslations('cookiePolicy');

  const heading =
    category === 'necessary'
      ? t('consent.categories.necessary.title')
      : category === 'measurement'
        ? t('consent.categories.measurement.title')
        : t('consent.categories.marketing.title');

  const sectionIntro =
    category === 'necessary'
      ? t('content.sectionIntro.necessary')
      : category === 'measurement'
        ? t('content.sectionIntro.measurement')
        : t('content.sectionIntro.marketing');

  return (
    <section className='mt-12' aria-labelledby={`cookie-section-${category}`}>
      <Title
        id={`cookie-section-${category}`}
        renderAs='h2'
        size='four'
        className='!mb-3'
      >
        {heading}
      </Title>
      <Body margin={false} size='sm' className='!mb-0 text-light-gray'>
        {sectionIntro}
      </Body>
      <CookiePolicyVendorList category={category} />
    </section>
  );
}
