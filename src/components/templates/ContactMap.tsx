import { useTranslation } from 'next-i18next';
import * as React from 'react';

import { Container } from '@/components/layout/Container';
import Button from '@/components/ui/Buttons/Button';

export const ContactMap = () => {
  const { t } = useTranslation('contact');
  return (
    <>
      <div className='cookieconsent-optin-marketing'>
        <div className='relative block flex h-[350px] items-center bg-gray-100 align-middle'>
          <iframe
            data-cookieblock-src='https://maps.google.de/maps?hl=de&q=Dücker+Medizintechnik%20%20%20%20%20Elfershäuser+Str.+18%20%20%20%20Melsungen&t=ROADMAP&z=12&ie=utf8&iwloc=b&output=embed'
            data-cookieconsent='marketing'
            width='100%'
            height='350'
            id='google-maps'
          ></iframe>
        </div>
      </div>
      <div className='cookieconsent-optout-marketing'>
        <div className='relative block flex h-[350px] items-center bg-gray-100 align-middle'>
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
                    window?.Cookiebot?.submitCustomConsent(false, false, true);
                  }}
                >
                  {t('content.mapsBanner.accept')}
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  className='w-full sm:w-56'
                  onClick={() => {
                    window?.Cookiebot?.show();
                  }}
                >
                  {t('content.mapsBanner.cookieSettings')}
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};
