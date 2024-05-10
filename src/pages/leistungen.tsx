import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { PiChartLineUpThin, PiPackageThin, PiWrenchThin } from 'react-icons/pi';

import Seo from '@/components/helpers/Seo';
import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import { AnimatedBadge } from '@/components/ui/Badges/AnimatedBadge';
import ArrowLink from '@/components/ui/Links/ArrowLink';
import { Title } from '@/components/ui/Typography/Title';

const ServicesPage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation('services');
  return (
    <Layout>
      <Seo
        templateTitle={t('meta.pageTitle')}
        description={t('meta.seo.description')}
        title={t('meta.seo.title')}
      />
      <main className='bg-white py-16 md:py-24'>
        <Container>
          <div className='-mx-4 flex flex-wrap'>
            <div className='w-full px-4'>
              <div className='mx-auto mb-12 max-w-[510px] text-center lg:mb-20'>
                <AnimatedBadge text={t('content.badge')} />
                <Title margin={false} className='mb-4'>
                  {t('content.title')}
                </Title>
                <p className='text-light-gray'>{t('content.text')}</p>
              </div>
            </div>
          </div>
          <div className='mx-auto flex max-w-7xl flex-wrap'>
            <ServiceCard
              title={t('content.cards.production.title')}
              details={t('content.cards.production.text')}
              icon={<PiChartLineUpThin className='h-10 w-10 text-white' />}
            />
            <ServiceCard
              title={t('content.cards.repair.title')}
              details={t('content.cards.repair.text')}
              icon={<PiWrenchThin className='h-10 w-10 text-white' />}
            />
            <ServiceCard
              title={t('content.cards.distribution.title')}
              details={t('content.cards.distribution.text')}
              icon={<PiPackageThin className='h-10 w-10 text-white' />}
            />
          </div>
        </Container>
      </main>
    </Layout>
  );
};

const ServiceCard = ({
  icon,
  title,
  details,
}: {
  icon: React.ReactNode;
  title: string;
  details: string;
}) => {
  const { t } = useTranslation('services');
  return (
    <>
      <div className='w-full px-4 md:w-1/2 lg:w-1/3'>
        <div className='mb-8 bg-gray-100 p-10 md:px-7 xl:px-10'>
          <div className='mb-8 flex h-12 w-12 items-center justify-center bg-dark p-3 lg:h-16 lg:w-16'>
            {icon}
          </div>
          <h4 className='mb-3 text-xl font-medium text-dark'>{title}</h4>
          <p className='text-body-color mb-6'>{details}</p>
          <ArrowLink href={`/leistungen/${title.toLowerCase()}`}>
            {t('content.cards.readMore')}
          </ArrowLink>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'services'])),
    },
  };
};

export default ServicesPage;
