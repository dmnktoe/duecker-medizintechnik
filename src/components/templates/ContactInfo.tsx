'use client';

import { useLocale, useTranslations } from 'next-intl';
import * as React from 'react';
import { VscCallOutgoing, VscHome, VscMail } from 'react-icons/vsc';

import { OpeningHoursWidget } from '@/components/templates/OpeningHoursWidget';
import { Body, Title, UnderlineLink } from '@/components/ui';

import { company } from '@/constants/company';

export default function ContactInfo() {
  const t = useTranslations('contact');
  const locale = useLocale();

  const IconWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className='bg-primary-500/10 text-primary-500 mr-6 flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-sm sm:h-[70px] sm:w-[70px]'>
        {children}
      </div>
    );
  };

  const InfoList = () => {
    return (
      <>
        <div className='flex flex-col gap-4'>
          <div className='flex w-full max-w-[370px] items-center'>
            <IconWrapper>
              <VscHome className='h-6 w-6' />
            </IconWrapper>
            <div className='w-full'>
              <Title size='five' renderAs='h5' margin={false}>
                {t('content.contactDetails.location')}
              </Title>
              <Body margin={false}>
                {company.street}
                <br />
                {company.city}
              </Body>
            </div>
          </div>
          <div className='flex w-full max-w-[370px] items-center'>
            <IconWrapper>
              <VscCallOutgoing className='h-6 w-6' />
            </IconWrapper>
            <div className='w-full'>
              <Title size='five' renderAs='h5' margin={false}>
                {t('content.contactDetails.phone')}
              </Title>
              <Body margin={false}>
                <UnderlineLink href={`tel:${company.phone}`}>
                  {company.phone}
                </UnderlineLink>
              </Body>
            </div>
          </div>
          <div className='flex w-full max-w-[370px] items-center'>
            <IconWrapper>
              <VscMail className='h-6 w-6' />
            </IconWrapper>
            <div className='w-full'>
              <Title size='five' renderAs='h5' margin={false}>
                {t('content.contactDetails.email')}
              </Title>
              <Body margin={false}>
                <UnderlineLink href={`mailto:${company.email}`}>
                  {company.email}
                </UnderlineLink>
              </Body>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Title>{t('content.title')}</Title>
      <Body className='mb-12'>{t('content.text')}</Body>
      <InfoList />
      <div className='mt-10 max-w-[370px]'>
        <OpeningHoursWidget
          locale={locale === 'en' ? 'en' : 'de'}
          variant='weeklyOverview'
        />
      </div>
    </>
  );
}
