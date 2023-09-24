import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { RiPhoneFill } from 'react-icons/ri';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';
import Button from '@/components/ui/buttons/Button';
import { Title } from '@/components/ui/typography/Title';

const ContactPage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation('contact');
  return (
    <Layout>
      <Seo templateTitle={t('seo.title')} description={t('seo.description')} />
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2504.4921251717064!2d9.525939712762506!3d51.117829971609424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bb5aaf09e8bad1%3A0x545375d8f9b01b22!2sRolf%20D%C3%BCcker%20M.E.T.Melsunger%20Endoskopie%20Technik!5e0!3m2!1sde!2sde!4v1694365981272!5m2!1sde!2sde'
        width='100%'
        height='400'
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
      ></iframe>
      <main className='py-16 md:py-24 lg:py-32'>
        <Container>
          <div className='flex flex-col gap-16'>
            <div className='flex flex-col'>
              <Title size='two'>{t('headline')}</Title>
              <p className='text-lg'>{t('subheadline')}</p>
            </div>
            <div className='flex flex-col gap-10 lg:flex-row'>
              <div className='h-auto w-full bg-gray-100 lg:w-2/3'>
                <div className='p-10'>
                  <h2 className='text-dark mb-4 text-4xl font-semibold tracking-tight'>
                    Kontaktieren Sie uns
                  </h2>
                  <div className='flex flex-row gap-4 divide-x divide-gray-200 px-4'>
                    <div>
                      <RiPhoneFill size={32} />
                    </div>
                    <div>t</div>
                  </div>
                </div>
              </div>
              <div className='h-auto w-full bg-gray-100 lg:w-1/3'>
                <div className='p-10'>
                  <h2 className='text-dark mb-4 text-4xl font-semibold tracking-tight'>
                    Kontaktieren Sie uns
                  </h2>
                  <p className='mb-8 font-light text-gray-500 sm:text-xl lg:mb-16'>
                    Got a technical issue? Want to send feedback about a beta
                    feature? Need details about our Business plan? Let us know.
                  </p>
                  <form action='#' className='space-y-4'>
                    <div>
                      <label
                        htmlFor='email'
                        className='mb-2 block text-sm font-medium text-gray-900'
                      >
                        Your email
                      </label>
                      <input
                        type='email'
                        id='email'
                        className='focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
                        placeholder='name@flowbite.com'
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='subject'
                        className='mb-2 block text-sm font-medium text-gray-900'
                      >
                        Subject
                      </label>
                      <input
                        type='text'
                        id='subject'
                        className='focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm'
                        placeholder='Let us know how we can help you'
                        required
                      />
                    </div>
                    <div className='sm:col-span-2'>
                      <label
                        htmlFor='message'
                        className='mb-2 block text-sm font-medium text-gray-900'
                      >
                        Your message
                      </label>
                      <textarea
                        id='message'
                        className='focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block h-24 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
                        placeholder='Leave a comment...'
                      ></textarea>
                    </div>
                    <Button type='submit' className='w-full'>
                      Submit
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'contact'])),
    },
  };
};

export default ContactPage;
