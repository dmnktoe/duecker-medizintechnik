'use client';

import { useTranslations } from 'next-intl';
import * as React from 'react';

import { ConsentPreferencesSection } from '@/components/helpers/consent/ConsentPreferencesSection';
import { Container } from '@/components/layout';
import { Body, PrimaryLink, Title } from '@/components/ui';

import { CookiePolicyCategorySection } from './CookiePolicyVendorList';

export default function CookieControlCenter() {
  const t = useTranslations('cookiePolicy');

  return (
    <section className='mx-auto max-w-5xl pb-16 lg:pb-24'>
      <Container>
        <Title>{t('content.title')}</Title>
        <Body className='mt-8'>{t('content.intro')}</Body>
        <PrimaryLink
          href='/datenschutz'
          variant='primary'
          className='mt-4 inline-block'
        >
          {t('content.privacyCta')}
        </PrimaryLink>

        <CookiePolicyCategorySection category='necessary' />
        <CookiePolicyCategorySection category='measurement' />
        <CookiePolicyCategorySection category='marketing' />

        <Title size='four' renderAs='h2' className='mt-16 !mb-3'>
          {t('content.settingsTitle')}
        </Title>
        <Body margin={false} size='sm' className='text-light-gray !mb-8'>
          {t('content.settingsIntro')}
        </Body>
        <ConsentPreferencesSection />
      </Container>
    </section>
  );
}
