import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';
import NextImage from '@/components/ui/NextImage';

const AboutUsPage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation('aboutUs');
  return (
    <Layout>
      <Seo templateTitle={t('seo.title')} description={t('seo.description')} />
      <section className='py-16 md:py-24'>
        <Container>
          <div className='mx-auto max-w-5xl'>
            <div className='max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400'>
              <h2 className='mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white'>
                Empowering {t('headline')}{' '}
                <span className='font-extrabold'>200,000+</span> companies
                worldwide
              </h2>
              <p className='mb-4 font-light'>
                {t('subheadline')}
                Track work across the enterprise through an open, collaborative
                platform. Link issues across Jira and ingest data from other
                software development tools, so your IT support and operations
                teams have richer contextual information to rapidly respond to
                requests, incidents, and changes.
              </p>
              <p className='mb-4 font-medium'>
                Deliver great service experiences fast - without the complexity
                of traditional ITSM solutions.Accelerate critical development
                work, eliminate toil, and deploy changes with ease.
              </p>
            </div>
          </div>
          <div className='gap-16 items-center py-8 mx-auto max-w-5xl lg:grid lg:grid-cols-2 lg:py-16'>
            <div className='font-light text-gray-500 sm:text-lg dark:text-gray-400'>
              <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white'>
                We didn't reinvent the wheel
              </h2>
              <p className='mb-4'>
                We are strategists, designers and developers. Innovators and
                problem solvers. Small enough to be simple and quick, but big
                enough to deliver the scope you want at the pace you need. Small
                enough to be simple and quick, but big enough to deliver the
                scope you want at the pace you need.
              </p>
              <p>
                We are strategists, designers and developers. Innovators and
                problem solvers. Small enough to be simple and quick.
              </p>
            </div>
            <div className='grid grid-cols-2 gap-4 mt-8'>
              <NextImage
                alt='hero'
                src='/images/about-us/duecker-medizintechnik_about_us_1.png'
                blurDataURL='/images/about-us/duecker-medizintechnik_about_us_1.png'
                useSkeleton={true}
                className='w-full rounded-lg'
                width={500}
                height={500}
              />
              <NextImage
                alt='hero'
                src='/images/about-us/duecker-medizintechnik_about_us_1.png'
                blurDataURL='/images/about-us/duecker-medizintechnik_about_us_1.png'
                useSkeleton={true}
                className='mt-4 w-full lg:mt-10 rounded-lg'
                width={500}
                height={500}
              />
            </div>
          </div>
          <div className='max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6'>
            <dl className='grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white'>
              <div className='flex flex-col items-center justify-center'>
                <dt className='mb-2 text-3xl md:text-4xl font-extrabold'>
                  73M+
                </dt>
                <dd className='font-light text-gray-500 dark:text-gray-400'>
                  developers
                </dd>
              </div>
              <div className='flex flex-col items-center justify-center'>
                <dt className='mb-2 text-3xl md:text-4xl font-extrabold'>
                  1B+
                </dt>
                <dd className='font-light text-gray-500 dark:text-gray-400'>
                  contributors
                </dd>
              </div>
              <div className='flex flex-col items-center justify-center'>
                <dt className='mb-2 text-3xl md:text-4xl font-extrabold'>
                  4M+
                </dt>
                <dd className='font-light text-gray-500 dark:text-gray-400'>
                  organizations
                </dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>
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
