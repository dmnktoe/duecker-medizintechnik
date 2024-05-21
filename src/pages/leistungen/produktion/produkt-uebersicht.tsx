import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { VscArrowRight } from 'react-icons/vsc';

import clsxm from '@/lib/clsxm';

import Seo from '@/components/helpers/Seo';
import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import NextBreadcrumb from '@/components/ui/Breadcrumb';
import UnderlineLink from '@/components/ui/Links/UnderlineLink';
import { Title } from '@/components/ui/Typography';

const ProductOverviewPage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation('services');
  const currentRoute = usePathname();
  return (
    <Layout>
      <Seo
        templateTitle={t('meta.pageTitle')}
        description={t('meta.seo.description')}
        title={t('meta.seo.title')}
      />
      <div className='sub-navigation sticky top-[var(--navigation-height)] z-40 border-t border-gray-100 bg-white/90 backdrop-blur-sm'>
        <Container>
          <nav className='flex items-center justify-between py-4'>
            <ul className='flex gap-4'>
              <li>
                <UnderlineLink
                  underline='hover'
                  href='/leistungen/produktion'
                  className={clsxm(
                    'hover:underline',
                    currentRoute === '/leistungen/produktion' && 'underline',
                  )}
                >
                  Übersicht
                </UnderlineLink>
              </li>
              <li>
                <UnderlineLink
                  underline='hover'
                  href='/leistungen/produktion/produkt-uebersicht'
                  className={clsxm(
                    'hover:underline',
                    currentRoute ===
                      '/leistungen/produktion/produkt-uebersicht' &&
                      'underline',
                  )}
                >
                  Produktübersicht
                </UnderlineLink>
              </li>
            </ul>
          </nav>
        </Container>
      </div>
      <main className='bg-white py-16 md:py-24'>
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
          <Title>Product Overview</Title>
        </Container>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'services'])),
    },
  };
};

export default ProductOverviewPage;
