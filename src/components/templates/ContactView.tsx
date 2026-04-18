'use client';

import { useTranslation } from 'react-i18next';
import * as React from 'react';

import { Container } from '@/components/layout';
import Breadcrumbs from '@/components/templates/Breadcrumbs';
import ContactDecorators from '@/components/templates/ContactDecorators';
import ContactForm from '@/components/templates/ContactForm';
import ContactInfo from '@/components/templates/ContactInfo';
import { Body, Title } from '@/components/ui';

import useConsent from '@/utils/useConsent';

export default function ContactView() {
  const { consent, loading } = useConsent();
  const { t } = useTranslation('contact');

  const RenderForm = () => {
    if (loading) {
      return (
        <div className='relative flex h-[350px] animate-pulse items-center bg-gray-100 align-middle' />
      );
    } else {
      if (!consent?.marketing) {
        return (
          <div className='bg-yellow-100 p-2 text-xs'>
            {t('content.contactForm.recaptchaCookieNotice')}
          </div>
        );
      } else {
        return <ContactForm />;
      }
    }
  };

  return (
    <section className='relative z-10 mx-auto max-w-5xl bg-white pb-16 pt-8 md:pt-16 lg:pb-24 lg:pt-24'>
      <Container>
        <div className='flex flex-wrap lg:justify-between'>
          <div className='w-full lg:w-6/12'>
            <div className='mb-12 lg:mb-0'>
              <Breadcrumbs />
              <ContactInfo />
            </div>
          </div>
          <div className='w-full lg:w-5/12'>
            <div className='relative rounded-lg bg-white p-8 shadow-lg sm:p-12'>
              <Title size='three'>{t('content.contactForm.title')}</Title>
              <Body color='light'>{t('content.contactForm.text')}</Body>
              <RenderForm />
              <ContactDecorators />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
