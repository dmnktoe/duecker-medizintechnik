import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { GiAutoRepair, GiTrade } from 'react-icons/gi';
import { MdOutlinePrecisionManufacturing } from 'react-icons/md';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';
import { AnimatedBadge } from '@/components/ui/AnimatedBadge';
import ArrowLink from '@/components/ui/links/ArrowLink';
import { Title } from '@/components/ui/typography/Title';

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
      <main className='bg-white py-16 md:py-24 '>
        <Container>
          <div className='-mx-4 flex flex-wrap'>
            <div className='w-full px-4'>
              <div className='mx-auto mb-12 max-w-[510px] text-center lg:mb-20'>
                <AnimatedBadge text={t('content.badge')} />
                <Title margin={false} className='mb-4'>
                  {t('content.title')}
                </Title>
                <p className='text-base text-dark'>{t('content.text')}</p>
              </div>
            </div>
          </div>
          <div className='-mx-4 flex flex-wrap'>
            <ServiceCard
              title={t('content.cards.production.title')}
              details={t('content.cards.production.text')}
              icon={
                <MdOutlinePrecisionManufacturing className='h-10 w-10 text-white' />
              }
            />
            <ServiceCard
              title={t('content.cards.repair.title')}
              details={t('content.cards.repair.text')}
              icon={<GiAutoRepair className='h-10 w-10 text-white' />}
            />
            <ServiceCard
              title={t('content.cards.commerce.title')}
              details={t('content.cards.commerce.text')}
              icon={<GiTrade className='h-10 w-10 text-white' />}
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
          <div className='mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary-500 p-3'>
            {icon}
          </div>
          <h4 className='mb-3 text-xl font-semibold text-dark'>{title}</h4>
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
