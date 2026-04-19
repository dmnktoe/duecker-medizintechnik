'use client';

import { ConsentWidget } from '@c15t/nextjs';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { Container } from '@/components/layout';
import { Title } from '@/components/ui';

export default function CookieControlCenter() {
  const t = useTranslations('cookiePolicy');

  return (
    <section className='mx-auto max-w-5xl pb-16 lg:pb-24'>
      <Container>
        <Title>{t('content.title')}</Title>
        <div className='mt-8'>
          <ConsentWidget />
        </div>
      </Container>
    </section>
  );
}
