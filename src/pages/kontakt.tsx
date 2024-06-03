import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { useEffect } from 'react';

import { Container } from '@/components/layout/Container';
import Page from '@/components/layout/Page';
import { ContactDecorators } from '@/components/templates/ContactDecorators';
import ContactForm from '@/components/templates/ContactForm';
import { ContactInfo } from '@/components/templates/ContactInfo';
import { ContactMap } from '@/components/templates/ContactMap';

import { isProd } from '@/constant/env';

const Kontakt = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation('contact');

  useEffect(() => {
    if (isProd) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.Cookiebot.initConsent();
    }
  }, []);

  return (
    <Page
      layout={{
        background: 'light',
        containerWidth: 'max-w-5xl',
        showBreadcrumbs: true,
        showHero: false,
        padding: 'default',
        topContent: <ContactMap />,
      }}
      seo={{
        title: t('meta.seo.title'),
        description: t('meta.seo.description'),
      }}
      title={t('meta.pageTitle')}
    >
      <section className='relative z-10 mx-auto max-w-5xl bg-white pb-12 lg:pb-24'>
        <Container>
          <div className='flex flex-wrap lg:justify-between'>
            <div className='w-full lg:w-6/12'>
              <div className='mb-12 lg:mb-0'>
                <ContactInfo />
              </div>
            </div>
            <div className='w-full lg:w-5/12'>
              <div className='relative rounded-lg bg-white p-8 shadow-lg sm:p-12'>
                <ContactForm />
                <ContactDecorators />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'contact'])),
    },
  };
};

export default Kontakt;
