import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { VscArrowRight } from 'react-icons/vsc';

import Seo from '@/components/helpers/Seo';
import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import DistributionConsult from '@/components/templates/DistributionConsult';
import DistributionFeatures from '@/components/templates/DistributionFeatures';
import DistributionIntro from '@/components/templates/DistributionIntro';
import ImageBanner from '@/components/templates/ImageBanner/ImageBanner';
import NextBreadcrumb from '@/components/ui/Breadcrumb';

import heroImg from '/public/images/distribution/duecker-medizintechnik_distribution_hero-bg.webp';

const Vertrieb = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation('distribution', { useSuspense: false });

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
      <main className='pt-16 md:pt-24'>
        <section>
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
          </Container>
        </section>
        <DistributionIntro />
        <DistributionFeatures />
        <DistributionConsult />
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'de', [
      'common',
      'distribution',
    ])),
  },
});

export default Vertrieb;
