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
              data-cookieblock-src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2504.4921251717064!2d9.525939712762506!3d51.117829971609424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bb5aaf09e8bad1%3A0x545375d8f9b01b22!2sRolf%20D%C3%BCcker%20M.E.T.Melsunger%20Endoskopie%20Technik!5e0!3m2!1sde!2sde!4v1694365981272!5m2!1sde!2sde'
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
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2504.4921251717064!2d9.525939712762506!3d51.117829971609424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bb5aaf09e8bad1%3A0x545375d8f9b01b22!2sRolf%20D%C3%BCcker%20M.E.T.Melsunger%20Endoskopie%20Technik!5e0!3m2!1sde!2sde!4v1694365981272!5m2!1sde!2sde'
          width='100%'
          height='350'
          id='google-maps'
        />
      )}
    </>
  );
};
