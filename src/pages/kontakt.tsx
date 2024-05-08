import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { useEffect } from 'react';
import { VscArrowRight } from 'react-icons/vsc';

import Seo from '@/components/helpers/Seo';
import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import { ContactDecorators } from '@/components/templates/ContactDecorators';
import ContactForm from '@/components/templates/ContactForm';
import { ContactInfo } from '@/components/templates/ContactInfo';
import { ContactMap } from '@/components/templates/ContactMap';
import NextBreadcrumb from '@/components/ui/Breadcrumb';

import { isProd } from '@/constant/env';

const ContactPage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation('contact');

  useEffect(() => {
    if (isProd) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.Cookiebot.initConsent();
    }
  }, []);

  return (
    <Layout>
      <Seo
        templateTitle={t('meta.pageTitle')}
        description={t('meta.seo.description')}
        title={t('meta.seo.title')}
      />
      <ContactMap />
      <main className='relative z-10 overflow-hidden bg-white py-16 lg:py-24'>
        <Container>
          <div className='mx-auto max-w-5xl'>
            <div className='-mx-4 flex flex-wrap lg:justify-between'>
              <div className='w-full px-4 lg:w-1/2 xl:w-6/12'>
                <div className='mb-12 max-w-[570px] lg:mb-0'>
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
                  <ContactInfo />
                </div>
              </div>
              <div className='w-full px-4 lg:w-1/2 xl:w-5/12'>
                <div className='relative rounded-lg bg-white p-8 shadow-lg sm:p-12'>
                  <ContactForm />
                  <ContactDecorators />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'contact'])),
    },
  };
};

export default ContactPage;
