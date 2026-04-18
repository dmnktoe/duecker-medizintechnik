'use client';

import { useTranslations } from 'next-intl';
import * as React from 'react';

import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui';

import useConsent from '@/utils/useConsent';

export const ContactMap = () => {
  const t = useTranslations('contact');
  const { consent, loading, submitCustomConsent, showConsentDialog } =
    useConsent();

  if (loading) {
    return (
      <div className='relative flex h-[250px] animate-pulse items-center bg-gray-100 align-middle md:h-[350px]' />
    );
  }

  if (!consent?.marketing) {
    return (
      <div className='relative flex h-[250px] items-center bg-gray-100 align-middle md:h-[350px]'>
        <Container>
          <div className='flex flex-col items-center gap-8 align-middle'>
            <span
              className='text-center font-normal text-gray-500 md:text-lg'
              dangerouslySetInnerHTML={{
                __html: t('content.mapsBanner.cookieNotice'),
              }}
            />
            <div className='flex w-full flex-wrap justify-center gap-4 sm:w-auto'>
              <Button
                variant='primary'
                size='sm'
                className='w-full sm:w-56'
                onClick={() => {
                  submitCustomConsent(false, false, true);
                }}
              >
                {t('content.mapsBanner.accept')}
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='w-full sm:w-56'
                onClick={() => {
                  showConsentDialog();
                }}
              >
                {t('content.mapsBanner.cookieSettings')}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (consent?.marketing) {
    return (
      <div className='relative flex h-[250px] items-center bg-gray-100 align-middle md:h-[350px]'>
        <iframe
          src='https://maps.google.de/maps?hl=de&q=Dücker+Medizintechnik%20%20%20%20%20Elfershäuser+Str.+18%20%20%20%20Melsungen&t=ROADMAP&z=12&ie=utf8&iwloc=b&output=embed'
          width='100%'
          height='100%'
          id='google-maps'
        ></iframe>
      </div>
    );
  }
};
