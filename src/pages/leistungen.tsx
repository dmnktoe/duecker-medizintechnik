import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { GiAutoRepair, GiTrade } from 'react-icons/gi';
import { MdOutlinePrecisionManufacturing } from 'react-icons/md';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';
import { Title } from '@/components/ui/typography/Title';

const ServicesPage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  return (
    <Layout>
      <Seo templateTitle='Leistungen' />
      <main className='bg-gray-100 py-16 md:py-24 '>
        <Container>
          <div className='flex flex-wrap -mx-4'>
            <div className='w-full px-4'>
              <div className='mx-auto mb-12 max-w-[510px] text-center lg:mb-20'>
                <span className='block mb-2 text-lg font-semibold text-primary'>
                  Our Services
                </span>
                <Title margin={false} className='mb-4'>
                  What We Offer
                </Title>
                <p className='text-base text-dark'>
                  There are many variations of passages of Lorem Ipsum available
                  but the majority have suffered alteration in some form
                </p>
              </div>
            </div>
          </div>
          <div className='flex flex-wrap -mx-4'>
            <ServiceCard
              title='Produktion'
              details='We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics.'
              icon={
                <MdOutlinePrecisionManufacturing className='h-10 w-10 text-white' />
              }
            />
            <ServiceCard
              title='Reparatur'
              details='We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics.'
              icon={<GiAutoRepair className='h-10 w-10 text-white' />}
            />
            <ServiceCard
              title='Handel'
              details='We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics.'
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
  return (
    <>
      <div className='w-full px-4 md:w-1/2 lg:w-1/3'>
        <div className='mb-8 rounded-[20px] bg-white p-10 shadow-md hover:shadow-lg md:px-7 xl:px-10'>
          <div className='mb-8 flex h-[70px] w-[70px] p-3 items-center justify-center rounded-2xl bg-primary-500'>
            {icon}
          </div>
          <h4 className='mb-3 text-xl font-semibold text-dark'>{title}</h4>
          <p className='text-body-color'>{details}</p>
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
