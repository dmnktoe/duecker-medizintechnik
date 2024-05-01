import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import Marquee from 'react-fast-marquee';
import { VscArrowRight } from 'react-icons/vsc';
import StaggerText from 'react-stagger-text';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';
import ImageBanner from '@/components/templates/ImageBanner/ImageBanner';
import NextBreadcrumb from '@/components/ui/Breadcrumb';
import ButtonLink from '@/components/ui/links/ButtonLink';
import UnderlineLink from '@/components/ui/links/UnderlineLink';
import { Title } from '@/components/ui/typography/Title';

import { customerLogos } from '@/constant/customerLogos';

import aboutUsImg1 from '/public/images/about-us/duecker-medizintechnik_about-us_1.webp';
import aboutUsImg2 from '/public/images/about-us/duecker-medizintechnik_about-us_2.webp';
import heroImg from '/public/images/about-us/duecker-medizintechnik_about-us_hero.webp';

const AboutUsPage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation('aboutUs');
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
        src={heroImg}
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
          <div className='mx-auto mb-16 max-w-5xl'>
            <Title>{t('content.title')}</Title>
            <Title size='three'>{t('content.companyText.title')}</Title>
            <p className='mb-4'>{t('content.companyText.text1')}</p>
            <p className='mb-4'>{t('content.companyText.text2')}</p>
            <p className='mb-4 font-medium'>{t('content.companyText.text3')}</p>
            <p className='mb-4'>{t('content.companyText.text4')}</p>
            <p className='mb-4'>{t('content.companyText.text5')}</p>
            <hr className='my-10' />
            <p className='mb-4'>
              Bei Dücker Medizintechnik legen wir großen Wert auf{' '}
              <span className='font-medium'> Qualität und Transparenz</span>.
              Unsere Zertifikate und Downloads sind ein Beweis für unser
              Engagement in diesen Bereichen. Möchten Sie mehr über unsere
              Zertifikate und Downloads erfahren? Besuchen Sie unsere{' '}
              <UnderlineLink href='/downloads'>
                Zertifikate und Downloads-Seite
              </UnderlineLink>
              , um detaillierte Informationen und die entsprechenden Dokumente
              herunterzuladen. Bei Fragen stehen wir Ihnen gerne zur Verfügung.
              Mit uns sind Sie in guter Gesellschaft.
            </p>
            <div className='pt-16'>
              <Marquee gradient={true} autoFill={true} speed={25}>
                {customerLogos.map((logo) => (
                  <div key={logo.name} className='px-6 opacity-40 lg:px-12'>
                    <Link
                      href={logo.url}
                      target='_blank'
                      className='text-gray-300'
                    >
                      <Image
                        src={logo.image}
                        width='120'
                        height='100'
                        alt='Icon'
                      />
                    </Link>
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
          <div className='mx-auto max-w-5xl items-center gap-16 py-8 lg:grid lg:grid-cols-2 lg:pb-16 lg:pt-32'>
            <div>
              <h2 className='mb-4 text-4xl font-bold tracking-tight text-gray-900'>
                <StaggerText>{t('content.innovationText.title')}</StaggerText>
              </h2>
              <p className='mb-4'>{t('content.innovationText.text')}</p>
              <ButtonLink
                href='/kontakt'
                className='mt-4'
                variant='dark'
                size='sm'
              >
                {t('content.innovationText.button')}
                <span aria-hidden='true' className='ml-2'>
                  →
                </span>
              </ButtonLink>
            </div>
            <div className='mt-8 grid grid-cols-2 gap-4'>
              <Image
                alt='hero'
                src={aboutUsImg1}
                placeholder='blur'
                className='w-full'
                width={600}
                height={500}
                loading='lazy'
              />
              <Image
                alt='hero'
                src={aboutUsImg2}
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
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'aboutUs'])),
    },
  };
};

export default AboutUsPage;
