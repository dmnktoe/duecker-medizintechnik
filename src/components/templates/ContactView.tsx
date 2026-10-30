'use client';

import { useTranslations } from 'next-intl';
import * as React from 'react';

import { Container } from '@/components/layout';
import Breadcrumbs from '@/components/templates/Breadcrumbs';
import ContactDecorators from '@/components/templates/ContactDecorators';
import ContactForm from '@/components/templates/ContactForm';
import ContactInfo from '@/components/templates/ContactInfo';
import { Body, Title } from '@/components/ui';

export default function ContactView() {
  const t = useTranslations('contact');

  return (
    <section className='relative z-10 mx-auto max-w-5xl bg-white pt-8 pb-16 md:pt-16 lg:pt-24 lg:pb-24'>
      <Container>
        <div className='flex flex-wrap lg:justify-between'>
          <div className='w-full lg:w-6/12'>
            <div className='mb-12 lg:mb-0'>
              <Breadcrumbs />
              <ContactInfo />
            </div>
          </div>
          <div className='w-full lg:w-5/12'>
            <div className='relative rounded-lg bg-white p-6 shadow-lg sm:p-12'>
              <Title size='three'>{t('content.contactForm.title')}</Title>
              <Body color='light'>{t('content.contactForm.text')}</Body>
              <ContactForm />
              <ContactDecorators />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
