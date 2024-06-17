import { Trans, useTranslation } from 'next-i18next';
import * as React from 'react';

import { Container } from '@/components/layout';
import { Body, PrimaryLink, Title, UnderlineLink } from '@/components/ui';

import { company } from '@/constant/company';

export default function LegalNoticeText() {
  const { t } = useTranslation('imprint');
  return (
    <section className='mx-auto max-w-5xl pb-16 md:pb-24'>
      <Container>
        <Title>{t('content.title')}</Title>
        <Body isStrong>{t('content.provider.title')}</Body>
        <Body isStrong>
          {company.companyName}
          <br />
          {company.street}
          <br />
          {company.city}
        </Body>
        <Body>
          {t('content.provider.phone')}: {company.phone}
        </Body>
        <Body>
          {t('content.provider.email')}:{' '}
          <PrimaryLink href={`mailto:${company.email}`}>
            {company.email}
          </PrimaryLink>
          <br />
          {t('content.provider.web')}:{' '}
          <PrimaryLink href={'https://' + company.url}>
            www.{company.url}
          </PrimaryLink>
        </Body>
        <Body>
          {t('content.provider.taxNumber')}: 02522835460
          <br />
          Amtsgericht Kassel HRB 16493
        </Body>
        <Body>
          {t('content.provider.imageSources')}: Patrick Dücker, Unsplash, Pexels
        </Body>
        <Body isStrong>{t('content.copyright.title')}</Body>
        <Body>{t('content.copyright.text')}</Body>
        <Body isStrong>{t('content.privacy.title')}</Body>
        <Body>{t('content.privacy.text1')}</Body>
        <Body>
          <Trans
            i18nKey='content.privacy.text2'
            t={t}
            components={{
              linkTag: (
                <UnderlineLink
                  target='_blank'
                  href='/datenschutz'
                  // eslint-disable-next-line react/no-children-prop
                  children=''
                />
              ),
            }}
          />
        </Body>
        <Body>
          <strong>{t('content.osPlatform.title')}</strong>
        </Body>
        <Body>
          <Trans
            i18nKey='content.osPlatform.text1'
            t={t}
            components={{
              linkTag: (
                <UnderlineLink
                  target='_blank'
                  href='https://ec.europa.eu/consumers/odr/'
                  // eslint-disable-next-line react/no-children-prop
                  children=''
                />
              ),
            }}
          />
        </Body>
        <Body>{t('content.osPlatform.text2')}</Body>
        <Body isStrong>{t('content.teleservicesAct.title')}</Body>
        <Body>{t('content.teleservicesAct.text')}</Body>
        <Body isStrong>{t('content.disclaimer.title')}</Body>
        <Body>{t('content.disclaimer.text1')}</Body>
        <Body>{t('content.disclaimer.text2')}</Body>
        <Body isStrong>{t('content.importantNotesOnLinks.title')}</Body>
        <Body>{t('content.importantNotesOnLinks.text')}</Body>
        <Body isStrong>{t('content.by.title')}</Body>
        <Body>{t('content.by.text')}</Body>
      </Container>
    </section>
  );
}
