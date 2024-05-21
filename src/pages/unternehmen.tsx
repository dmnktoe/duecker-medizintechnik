import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Trans, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import Marquee from 'react-fast-marquee';
import { VscArrowRight } from 'react-icons/vsc';

import Seo from '@/components/helpers/Seo';
import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import ImageBanner from '@/components/templates/ImageBanner/ImageBanner';
import NextBreadcrumb from '@/components/ui/Breadcrumb';
import ButtonLink from '@/components/ui/Links/ButtonLink';
import UnderlineLink from '@/components/ui/Links/UnderlineLink';
import { Body } from '@/components/ui/Typography';
import { Title } from '@/components/ui/Typography/Title';

import { partners } from '@/constant/partners';

import companyImg1 from '/public/images/company/duecker-medizintechnik_company_1.webp';
import companyImg2 from '/public/images/company/duecker-medizintechnik_company_2.webp';
import companyHero from '/public/images/company/duecker-medizintechnik_company_hero.webp';

const CompanyPage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation('company');
  return (
    <Layout>
      <Seo
        templateTitle={t('meta.pageTitle')}
        description={t('meta.seo.description')}
        title={t('meta.seo.title')}
      />
      <ImageBanner
        role='hero'
        delay={0}
        priority={true}
        src={companyHero}
        className='flex-1'
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
          </div>
          <div className='mx-auto mb-16 max-w-5xl text-sm'>
            <Title>{t('content.title')}</Title>
            <Body>{t('content.companyText.text1')}</Body>
            <Body>{t('content.companyText.text2')}</Body>
            <Body>{t('content.companyText.text3')}</Body>
            <Body>{t('content.companyText.text4')}</Body>
            <Body>
              <Trans
                i18nKey='content.companyText.text5'
                t={t}
                components={{
                  linkTag: (
                    <UnderlineLink
                      href='/downloads'
                      // eslint-disable-next-line react/no-children-prop
                      children=''
                    />
                  ),
                  // eslint-disable-next-line react/no-children-prop
                  italicTag: <span className='font-serif italic' children='' />,
                }}
              />
            </Body>
            <div className='pt-16'>
              <Marquee gradient={true} autoFill={true} speed={25}>
                {partners.map((partner) => (
                  <div key={partner.name} className='px-6 lg:px-12'>
                    <Link
                      href={partner.url}
                      target='_blank'
                      className='text-gray-300'
                    >
                      <partner.image
                        key={partner.name}
                        className='h-6 w-20 md:h-10 md:w-32'
                      />
                    </Link>
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
          <div className='mx-auto max-w-5xl items-center gap-16 py-8 lg:grid lg:grid-cols-2 lg:pb-16 lg:pt-32'>
            <div>
              <Title size='two'>{t('content.innovationText.title')}</Title>
              <Body className='mb-4'>{t('content.innovationText.text')}</Body>
              <ButtonLink
                href='/kontakt'
                className='mt-4'
                variant='dark'
                size='sm'
              >
                {t('content.innovationText.button')}
                <span aria-hidden='true' className='ml-2'>
                  <VscArrowRight className='relative -top-0.5 inline-block h-4 w-4' />
                </span>
              </ButtonLink>
            </div>
            <div className='mt-8 grid grid-cols-2 gap-4'>
              <Image
                alt='hero'
                src={companyImg1}
                placeholder='blur'
                className='w-full'
                width={600}
                height={500}
                loading='lazy'
              />
              <Image
                alt='hero'
                src={companyImg2}
                placeholder='blur'
                className='mt-4 w-full lg:mt-10'
                width={600}
                height={500}
                loading='lazy'
              />
            </div>
          </div>
        </Container>
      </main>
      <div className='relative'>
        <div className='after:absolute after:bottom-0 after:-z-10 after:h-[40rem] after:w-full after:rounded-tl-[15rem] after:bg-gradient-to-b after:from-primary-500/10 after:to-primary-600/0'></div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'company'])),
    },
  };
};

export default CompanyPage;
