'use client';

import { useTranslations } from 'next-intl';
import * as React from 'react';

import { Container } from '@/components/layout';
import Breadcrumbs from '@/components/templates/Breadcrumbs';
import ContactDecorators from '@/components/templates/ContactDecorators';
import ContactForm from '@/components/templates/ContactForm';
import ContactInfo from '@/components/templates/ContactInfo';
import { Body, Title } from '@/components/ui';

import useConsent from '@/utils/useConsent';

type FormContainerProps = {
  loading: boolean;
  hasConsent: boolean;
  notice: string;
};

const FormContainer = ({ loading, hasConsent, notice }: FormContainerProps) => {
  if (loading) {
    return (
      <div className='relative flex h-[350px] animate-pulse items-center bg-gray-100' />
    );
  }
  if (!hasConsent) {
    return <div className='bg-yellow-100 p-2 text-xs'>{notice}</div>;
  }
  return <ContactForm />;
};

export default function ContactView() {
  const { consent, loading } = useConsent();
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
            <div className='relative rounded-lg bg-white p-8 shadow-lg sm:p-12'>
              <Title size='three'>{t('content.contactForm.title')}</Title>
              <Body color='light'>{t('content.contactForm.text')}</Body>
              <FormContainer
                loading={loading}
                hasConsent={!!consent?.marketing}
                notice={t('content.contactForm.recaptchaCookieNotice')}
              />
              <ContactDecorators />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
