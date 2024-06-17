import { useTranslation } from 'next-i18next';
import * as React from 'react';
import { VscCallOutgoing, VscHome, VscMail } from 'react-icons/vsc';

import UnderlineLink from '@/components/ui/Links/UnderlineLink';
import { Body, Title } from '@/components/ui/Typography';

import { company } from '@/constant/company';

export default function ContactInfo() {
  const { t } = useTranslation('contact');

  const IconWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className='mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden bg-primary-500 bg-opacity-5 text-primary-500 sm:h-[70px] sm:max-w-[70px]'>
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
    </>
  );
}
