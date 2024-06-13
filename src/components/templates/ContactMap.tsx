import { useTranslation } from 'next-i18next';
import * as React from 'react';

import { Container } from '@/components/layout/Container';
import Button from '@/components/ui/Buttons/Button';

import { isLocal, isProd } from '@/constant/env';

export const ContactMap = () => {
  const { t } = useTranslation('contact');
  return (
    <>
      {isProd ? (
        <>
          <div className='cookieconsent-optin-marketing flex h-[350px] items-center bg-gray-100 align-middle'>
            <iframe
              data-cookieblock-src='https://maps.google.de/maps?hl=de&q=Dücker+Medizintechnik%20%20%20%20%20Elfershäuser+Str.+18%20%20%20%20Melsungen&t=ROADMAP&z=10&ie=utf8&iwloc=b&output=embed'
              data-cookieconsent='marketing'
              width='100%'
              height='350'
              id='google-maps'
            ></iframe>
          </div>
          <div className='cookieconsent-optout-marketing flex h-[350px] items-center bg-gray-100 align-middle'>
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
                    onClick={
                      isLocal
                        ? () => {
                            // eslint-disable-next-line no-console
                            console.log('Marketing Cookies accepted');
                          }
                        : () => {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            window.Cookiebot.submitCustomConsent(
                              false,
                              false,
                              true,
                            );
                          }
                    }
                  >
                    {t('content.mapsBanner.accept')}
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    className='w-full sm:w-56'
                    onClick={
                      isLocal
                        ? () => {
                            // eslint-disable-next-line no-console
                            console.log('Open Cookiebot Dialog');
                          }
                        : () => {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            window.Cookiebot.show();
                          }
                    }
                  >
                    {t('content.mapsBanner.cookieSettings')}
                  </Button>
                </div>
              </div>
            </Container>
          </div>
        </>
      ) : (
        <iframe
          src='https://maps.google.de/maps?hl=de&q=Dücker+Medizintechnik%20%20%20%20%20Elfershäuser+Str.+18%20%20%20%20Melsungen&t=ROADMAP&z=10&ie=utf8&iwloc=b&output=embed'
          width='100%'
          height='350'
          id='google-maps'
        />
      )}
    </>
  );
};
