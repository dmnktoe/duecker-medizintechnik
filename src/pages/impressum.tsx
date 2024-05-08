import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Trans, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { VscArrowRight } from 'react-icons/vsc';

import Seo from '@/components/helpers/Seo';
import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import NextBreadcrumb from '@/components/ui/Breadcrumb';
import PrimaryLink from '@/components/ui/links/PrimaryLink';
import UnderlineLink from '@/components/ui/links/UnderlineLink';
import { Title } from '@/components/ui/typography/Title';

import { company } from '@/constant/company';

const ImprintPage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation('imprint');
  return (
    <Layout>
      <Seo
        templateTitle={t('meta.pageTitle')}
        description={t('meta.seo.description')}
        title={t('meta.seo.title')}
      />
      <main className='mx-auto max-w-5xl py-16 md:py-24'>
        <Container>
          <NextBreadcrumb
            homeElement='Startseite'
            separator={
              <VscArrowRight className='mr-2 h-5 w-3 md:h-6 md:w-3 lg:h-6 lg:w-4' />
            }
            activeClasses='text-primary-500'
            containerClasses='flex'
            listClasses='hover:underline mr-2'
            capitalizeLinks
            className='mb-6'
          />
          <Title>{t('content.title')}</Title>
          <div className='privacy__content'>
            <p>
              <strong>{t('content.provider.title')}</strong>
            </p>
            <p>
              <strong>{company.companyName}</strong>
              <br />
              {company.street}
              <br />
              {company.city}
            </p>
            <p>
              {t('content.provider.phone')}: {company.phone}
            </p>
            <p>
              {t('content.provider.email')}:{' '}
              <PrimaryLink href={`mailto:${company.email}`}>
                {company.email}
              </PrimaryLink>
              <br />
              {t('content.provider.web')}:{' '}
              <PrimaryLink href={'https://' + company.url}>
                www.{company.url}
              </PrimaryLink>
            </p>
            <p>
              {t('content.provider.taxNumber')}: 02522835460
              <br />
              Amtsgericht Kassel HRB 16493
            </p>
            <p>
              {t('content.provider.imageSources')}: Patrick Dücker, Unsplash,
              Pexels
            </p>
            <p>
              <strong>{t('content.copyright.title')}</strong>
            </p>
            <p>{t('content.copyright.text')}</p>
            <p>
              <strong>{t('content.privacy.title')}</strong>
            </p>
            <p>{t('content.privacy.text1')}</p>
            <p>
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
            </p>
            <p>
              <strong>{t('content.osPlatform.title')}</strong>
            </p>
            <p>
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
            </p>
            <p>{t('content.osPlatform.text2')}</p>
            <p>
              <strong>{t('content.teleservicesAct.title')}</strong>
            </p>
            <p>{t('content.teleservicesAct.text')}</p>
            <p>
              <strong>{t('content.disclaimer.title')}</strong>
            </p>
            <p>{t('content.disclaimer.text1')}</p>
            <p>{t('content.disclaimer.text2')}</p>
            <p>
              <strong>{t('content.importantNotesOnLinks.title')}</strong>
            </p>
            <p>{t('content.importantNotesOnLinks.text')}</p>
            <p>
              <strong>{t('content.by.title')}</strong>
            </p>
            <p>{t('content.by.text')}</p>
          </div>
        </Container>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'imprint'])),
    },
  };
};

export default ImprintPage;
