import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { VscArrowRight, VscCheck } from 'react-icons/vsc';

import clsxm from '@/lib/clsxm';

import Seo from '@/components/helpers/Seo';
import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import { AspectRatio } from '@/components/ui/AspectRatio';
import NextBreadcrumb from '@/components/ui/Breadcrumb';
import UnderlineLink from '@/components/ui/Links/UnderlineLink';
import UnstyledLink from '@/components/ui/Links/UnstyledLink';
import { Body } from '@/components/ui/Typography';
import { Title } from '@/components/ui/Typography/Title';

const ProductionPage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation('production');
  const currentRoute = usePathname();
  return (
    <Layout>
      <Seo
        templateTitle={t('meta.pageTitle')}
        description={t('meta.seo.description')}
        title={t('meta.seo.title')}
      />
      <div className='sub-navigation sticky top-[var(--navigation-height)] z-40 border-t border-gray-100 bg-white/90 backdrop-blur-lg'>
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
      <main className='py-16 md:py-24'>
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
          <div className='mb-16 flex flex-col items-start lg:mb-32 lg:flex-row lg:gap-16'>
            <div className='mb-6 w-full lg:mb-0 lg:w-2/3 xl:w-1/2'>
              <div className='text-dark'>
                <Title>{t('content.title1')}</Title>
                <Body>{t('content.text1')}</Body>
                <Body isStrong className='my-6'>
                  {t('content.list.title')}
                </Body>
                <ul className='mb-6 space-y-3'>
                  <li className='flex items-center'>
                    <VscCheck className='mr-4 h-4 w-4 text-primary-500' />
                    <Body margin={false}>
                      {t('content.list.items.1.label')}
                    </Body>
                  </li>
                  <li className='flex items-center'>
                    <VscCheck className='mr-4 h-4 w-4 text-primary-500' />
                    <Body margin={false}>
                      {t('content.list.items.2.label')}
                    </Body>
                  </li>
                  <li className='flex items-center'>
                    <VscCheck className='mr-4 h-4 w-4 text-primary-500' />
                    <Body margin={false}>
                      {t('content.list.items.3.label')}
                    </Body>
                  </li>
                </ul>
              </div>
            </div>
            <div className='w-full lg:w-1/3 xl:w-1/2'>
              <div className='md:pl-5'>
                <AspectRatio ratio={1}>
                  <Image
                    src='/images/production/duecker-medizintechnik_production_grid-bg.jpg'
                    width={2000}
                    height={2000}
                    className='object-cover object-center'
                    alt=''
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
          <div className='flex flex-col-reverse gap-8 lg:flex-row lg:gap-16 2xl:mx-16'>
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
            <div className='w-full md:py-24 lg:w-1/3 lg:px-4 lg:py-32 xl:mb-0 xl:w-1/2'>
              <Title>{t('content.title2')}</Title>
              <Body>{t('content.text2')}</Body>
              <Body margin={false}>{t('content.text3')}</Body>
            </div>
          </div>
        </Container>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'de', ['common', 'production'])),
  },
});

export default ProductionPage;
