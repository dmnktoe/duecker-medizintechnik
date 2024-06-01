import { useTranslation } from 'next-i18next';
import * as React from 'react';

import { Container } from '@/components/layout';
import UnstyledLink from '@/components/ui/Links/UnstyledLink';
import { Body, Title } from '@/components/ui/Typography';

export default function ProductionTiles() {
  const { t } = useTranslation('production');
  return (
    <section className='pb-16 md:pb-24 lg:pb-32'>
      <Container>
        <div className='flex flex-col-reverse gap-8 lg:flex-row lg:gap-16 2xl:mx-0'>
          <div className='w-full lg:w-2/3 xl:w-1/2'>
            <div className='flex h-full flex-wrap'>
              <div className='mb-4 w-full md:mb-0 md:w-1/2'>
                <div className='flex h-full flex-col'>
                  <UnstyledLink
                    className='relative mb-4 block h-full bg-primary-50 px-8 pb-5 pt-8 transition duration-200 hover:bg-primary-100'
                    href='/leistungen/produktion/produkt-uebersicht'
                  >
                    <div className='flex h-full max-w-sm flex-col justify-between pr-16'>
                      <Body size='sm'>{t('content.boxes.1.text')}</Body>
                      <Title size='three'>{t('content.boxes.1.title')}</Title>
                    </div>
                  </UnstyledLink>
                  <UnstyledLink
                    className='relative block h-full bg-purple-50 px-8 pb-5 pt-8 transition duration-200 hover:bg-purple-100'
                    href='/leistungen/produktion/produkt-uebersicht'
                  >
                    <div className='flex h-full max-w-sm flex-col justify-between pr-16'>
                      <Body size='sm'>{t('content.boxes.2.text')}</Body>
                      <Title size='three'>{t('content.boxes.2.title')}</Title>
                    </div>
                  </UnstyledLink>
                </div>
              </div>
              <div className='w-full md:w-1/2 md:pl-4'>
                <UnstyledLink
                  className='relative block h-full bg-gray-50 px-8 pb-5 pt-8 transition duration-200 hover:bg-gray-100'
                  href='/leistungen/produktion/produkt-uebersicht'
                >
                  <div className='flex h-full max-w-sm flex-col items-start justify-between pr-16'>
                    <Body size='sm'>{t('content.boxes.3.text')}</Body>
                    <Title size='three'>{t('content.boxes.3.title')}</Title>
                  </div>
                </UnstyledLink>
              </div>
            </div>
          </div>
          <div className='w-full md:py-2 lg:w-1/3 lg:px-4 lg:py-32 xl:mb-0 xl:w-1/2'>
            <Title>{t('content.title2')}</Title>
            <Body>{t('content.text2')}</Body>
            <Body margin={false}>{t('content.text3')}</Body>
          </div>
        </div>
      </Container>
    </section>
  );
}
