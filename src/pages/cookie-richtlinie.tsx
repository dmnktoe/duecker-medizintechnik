import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { useEffect } from 'react';
import { VscArrowRight } from 'react-icons/vsc';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';
import NextBreadcrumb from '@/components/ui/Breadcrumb';
import { Title } from '@/components/ui/typography/Title';

const CookiePolicy = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation('imprint');

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
      <Seo templateTitle={t('seo.title')} />
      <main className='py-16 lg:py-24'>
        <Container>
          <div className='mx-auto mb-16 max-w-5xl'>
            <NextBreadcrumb
              homeElement='Startseite'
              separator={<VscArrowRight className='mr-2 h-6 w-3' />}
              activeClasses='text-primary-500'
              containerClasses='flex'
              listClasses='hover:underline mr-2'
              capitalizeLinks
              className='mb-6'
            />
            <Title margin={false}>Cookie Richtlinie</Title>
            <p>
              Hier finden Sie alle wichtigen Dokumente und Zertifikate zum
              Download.
            </p>
            <hr className='my-12' />
            {process.env.NODE_ENV == 'production' && (
              <div id='CookiebotDeclaration' />
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
