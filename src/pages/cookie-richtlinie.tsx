import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { useEffect } from 'react';
import { VscArrowRight } from 'react-icons/vsc';

import Seo from '@/components/helpers/Seo';
import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import NextBreadcrumb from '@/components/ui/Breadcrumb';
import { Title } from '@/components/ui/typography/Title';

import { isProd } from '@/constant/env';

const CookiePolicy = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation('cookiePolicy');

  useEffect(() => {
    const cookieBotWrapper = document.getElementById('CookiebotDeclaration');
    if (cookieBotWrapper) {
      const script = document.createElement('script');
      script.id = 'CookieDeclaration';
      script.type = 'text/javascript';
      script.async = true;
      script.src =
        'https://consent.cookiebot.com/3722981a-3eb0-4ff9-9145-777cf50e6875/cd.js';

      cookieBotWrapper.appendChild(script);
    }
  }, []);

  return (
    <Layout>
      <Seo
        templateTitle={t('meta.pageTitle')}
        description={t('meta.seo.description')}
        title={t('meta.seo.title')}
      />
      <main className='py-16 lg:py-24'>
        <Container>
          <div className='mx-auto max-w-5xl'>
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
            <Title margin={false}>{t('content.title')}</Title>
            <p>{t('content.text')}</p>
            <hr className='my-12' />
            {isProd ? (
              <div id='CookiebotDeclaration' />
            ) : (
              <span className='text-red-700'>
                {t('content.cookieBotAvailability')}
              </span>
            )}
          </div>
        </Container>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', [
        'common',
        'cookiePolicy',
      ])),
    },
  };
};

export default CookiePolicy;
