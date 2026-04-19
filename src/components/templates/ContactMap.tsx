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
            <p className='text-center font-normal text-gray-500 md:text-lg'>
              {t('content.mapsBanner.cookieNoticeLine1')}
              <br />
              {t('content.mapsBanner.cookieNoticeLine2')}
            </p>
            <div className='flex w-full flex-wrap justify-center gap-4 sm:w-auto'>
              <Button
                variant='primary'
                size='sm'
                className='w-full sm:w-56'
                onClick={() => submitCustomConsent(false, true)}
              >
                {t('content.mapsBanner.accept')}
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='w-full sm:w-56'
                onClick={() => showConsentDialog()}
              >
                {t('content.mapsBanner.cookieSettings')}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className='relative flex h-[250px] items-center bg-gray-100 align-middle md:h-[350px]'>
      <iframe
        src='https://maps.google.de/maps?hl=de&q=Dücker+Medizintechnik+Elfershäuser+Str.+18+Melsungen&t=ROADMAP&z=12&ie=utf8&iwloc=b&output=embed'
        width='100%'
        height='100%'
        title={t('content.mapsBanner.iframeTitle')}
        loading='lazy'
      />
    </div>
  );
};
