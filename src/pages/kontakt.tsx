import { GetServerSideProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import {
  VscArrowRight,
  VscCallOutgoing,
  VscHome,
  VscMail,
} from 'react-icons/vsc';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';
import NextBreadcrumb from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/buttons/Button';
import { Title } from '@/components/ui/typography/Title';

import { data } from '@/constant/data';
import { isLocal } from '@/constant/env';

const ContactPage = (
  _props: InferGetStaticPropsType<typeof getServerSideProps>,
) => {
  const { t } = useTranslation('contact');
  return (
    <Layout>
      <Seo templateTitle={t('seo.title')} description={t('seo.description')} />
      <iframe
        data-cookieblock-src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2504.4921251717064!2d9.525939712762506!3d51.117829971609424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bb5aaf09e8bad1%3A0x545375d8f9b01b22!2sRolf%20D%C3%BCcker%20M.E.T.Melsunger%20Endoskopie%20Technik!5e0!3m2!1sde!2sde!4v1694365981272!5m2!1sde!2sde'
        data-cookieconsent='marketing'
        width='100%'
        height='350'
        referrerPolicy='no-referrer-when-downgrade'
        loading='eager'
      ></iframe>
      <div className='cookieconsent-optout-marketing flex h-[350px] items-center bg-gray-100 align-middle'>
        <Container>
          <div className='flex flex-col items-center gap-8 align-middle'>
            <span className='text-center font-normal text-gray-500 md:text-lg'>
              Dieser Inhalt wird über Google Maps geladen.
              <br />
              Akzeptieren Sie die Marketing Cookies um den Inhalt anzuzeigen.
            </span>
            <div className='flex w-full flex-wrap justify-center gap-4 sm:w-auto'>
              <Button
                variant='primary'
                size='sm'
                className='w-full sm:w-56'
                onClick={
                  isLocal
                    ? () => {
                        // eslint-disable-next-line no-console
                        console.log('Marketing Cookies accepted');
                      }
                    : () => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        window.Cookiebot.submitCustomConsent('optinMarketing');
                      }
                }
              >
                Marketing Cookies akzeptieren
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='w-full sm:w-56'
                onClick={
                  isLocal
                    ? () => {
                        // eslint-disable-next-line no-console
                        console.log('Open Cookiebot Dialog');
                      }
                    : () => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        window.Cookiebot.show();
                      }
                }
              >
                Cookie-Einstellungen
              </Button>
            </div>
          </div>
        </Container>
      </div>
      <main className='relative z-10 overflow-hidden bg-white py-16 lg:py-24'>
        <Container>
          <div className='mx-auto max-w-5xl'>
            <div className='-mx-4 flex flex-wrap lg:justify-between'>
              <div className='w-full px-4 lg:w-1/2 xl:w-6/12'>
                <div className='mb-12 max-w-[570px] lg:mb-0'>
                  <NextBreadcrumb
                    homeElement='Startseite'
                    separator={<VscArrowRight className='mr-2 h-6 w-3' />}
                    activeClasses='text-primary-500'
                    containerClasses='flex'
                    listClasses='hover:underline mr-2'
                    capitalizeLinks
                    className='mb-6'
                  />
                  <Title margin={false}>Kontakt aufnehmen</Title>
                  <p className='text-body-color mb-12 text-base leading-relaxed'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eius tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim adiqua minim veniam quis nostrud exercitation
                    ullamco
                  </p>
                  <div className='mb-8 flex w-full max-w-[370px] items-center'>
                    <div className='mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary-500 bg-opacity-5 text-primary-500 sm:h-[70px] sm:max-w-[70px]'>
                      <VscHome className='h-8 w-8' />
                    </div>
                    <div className='w-full'>
                      <h4 className='mb-1 text-xl font-bold text-dark'>
                        Unser Standort
                      </h4>
                      <p className='text-body-color text-base'>
                        {data.street}
                        <br />
                        {data.city}
                      </p>
                    </div>
                  </div>
                  <div className='mb-8 flex w-full max-w-[370px] items-center'>
                    <div className='mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary-500 bg-opacity-5 text-primary-500 sm:h-[70px] sm:max-w-[70px]'>
                      <VscCallOutgoing className='h-8 w-8' />
                    </div>
                    <div className='w-full'>
                      <h4 className='mb-1 text-xl font-bold text-dark'>
                        Phone Number
                      </h4>
                      <p className='text-body-color text-base'>
                        (+62)81 414 257 9980
                      </p>
                    </div>
                  </div>
                  <div className='mb-8 flex w-full max-w-[370px] items-center'>
                    <div className='mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary-500 bg-opacity-5 text-primary-500 sm:h-[70px] sm:max-w-[70px]'>
                      <VscMail className='h-8 w-8' />
                    </div>
                    <div className='w-full'>
                      <h4 className='mb-1 text-xl font-bold text-dark'>
                        Email Address
                      </h4>
                      <p className='text-body-color text-base'>
                        info@yourdomain.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full px-4 lg:w-1/2 xl:w-5/12'>
                <div className='relative rounded-lg bg-white p-8 shadow-lg sm:p-12'>
                  <Title size='three'>Schreiben Sie uns</Title>
                  <p className='mb-8 font-light text-gray-500 lg:mb-16'>
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
                        className='dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500'
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
                        className='dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500'
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
                        className='block h-24 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500'
                        placeholder='Leave a comment...'
                      ></textarea>
                    </div>
                    <Button type='submit' className='w-full'>
                      Submit
                    </Button>
                  </form>
                  <div>
                    <span className='absolute -right-9 -top-10 z-[-1]'>
                      <svg
                        width='100'
                        height='100'
                        viewBox='0 0 100 100'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M0 100C0 44.7715 0 0 0 0C55.2285 0 100 44.7715 100 100C100 100 100 100 0 100Z'
                          fill='var(--color-primary-500)'
                        />
                      </svg>
                    </span>
                    <span className='absolute -right-10 top-[90px] z-[-1]'>
                      <svg
                        width='34'
                        height='134'
                        viewBox='0 0 34 134'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <circle
                          cx='31.9993'
                          cy='132'
                          r='1.66667'
                          transform='rotate(180 31.9993 132)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='31.9993'
                          cy='117.333'
                          r='1.66667'
                          transform='rotate(180 31.9993 117.333)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='31.9993'
                          cy='102.667'
                          r='1.66667'
                          transform='rotate(180 31.9993 102.667)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='31.9993'
                          cy='88'
                          r='1.66667'
                          transform='rotate(180 31.9993 88)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='31.9993'
                          cy='73.3333'
                          r='1.66667'
                          transform='rotate(180 31.9993 73.3333)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='31.9993'
                          cy='45'
                          r='1.66667'
                          transform='rotate(180 31.9993 45)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='31.9993'
                          cy='16'
                          r='1.66667'
                          transform='rotate(180 31.9993 16)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='31.9993'
                          cy='59'
                          r='1.66667'
                          transform='rotate(180 31.9993 59)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='31.9993'
                          cy='30.6666'
                          r='1.66667'
                          transform='rotate(180 31.9993 30.6666)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='31.9993'
                          cy='1.66665'
                          r='1.66667'
                          transform='rotate(180 31.9993 1.66665)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='17.3333'
                          cy='132'
                          r='1.66667'
                          transform='rotate(180 17.3333 132)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='17.3333'
                          cy='117.333'
                          r='1.66667'
                          transform='rotate(180 17.3333 117.333)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='17.3333'
                          cy='102.667'
                          r='1.66667'
                          transform='rotate(180 17.3333 102.667)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='17.3333'
                          cy='88'
                          r='1.66667'
                          transform='rotate(180 17.3333 88)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='17.3333'
                          cy='73.3333'
                          r='1.66667'
                          transform='rotate(180 17.3333 73.3333)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='17.3333'
                          cy='45'
                          r='1.66667'
                          transform='rotate(180 17.3333 45)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='17.3333'
                          cy='16'
                          r='1.66667'
                          transform='rotate(180 17.3333 16)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='17.3333'
                          cy='59'
                          r='1.66667'
                          transform='rotate(180 17.3333 59)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='17.3333'
                          cy='30.6666'
                          r='1.66667'
                          transform='rotate(180 17.3333 30.6666)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='17.3333'
                          cy='1.66665'
                          r='1.66667'
                          transform='rotate(180 17.3333 1.66665)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='2.66536'
                          cy='132'
                          r='1.66667'
                          transform='rotate(180 2.66536 132)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='2.66536'
                          cy='117.333'
                          r='1.66667'
                          transform='rotate(180 2.66536 117.333)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='2.66536'
                          cy='102.667'
                          r='1.66667'
                          transform='rotate(180 2.66536 102.667)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='2.66536'
                          cy='88'
                          r='1.66667'
                          transform='rotate(180 2.66536 88)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='2.66536'
                          cy='73.3333'
                          r='1.66667'
                          transform='rotate(180 2.66536 73.3333)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='2.66536'
                          cy='45'
                          r='1.66667'
                          transform='rotate(180 2.66536 45)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='2.66536'
                          cy='16'
                          r='1.66667'
                          transform='rotate(180 2.66536 16)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='2.66536'
                          cy='59'
                          r='1.66667'
                          transform='rotate(180 2.66536 59)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='2.66536'
                          cy='30.6666'
                          r='1.66667'
                          transform='rotate(180 2.66536 30.6666)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='2.66536'
                          cy='1.66665'
                          r='1.66667'
                          transform='rotate(180 2.66536 1.66665)'
                          fill='var(--color-primary-100)'
                        />
                      </svg>
                    </span>
                    <span className='absolute -bottom-7 -left-7 z-[-1]'>
                      <svg
                        width='107'
                        height='134'
                        viewBox='0 0 107 134'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <circle
                          cx='104.999'
                          cy='132'
                          r='1.66667'
                          transform='rotate(180 104.999 132)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='104.999'
                          cy='117.333'
                          r='1.66667'
                          transform='rotate(180 104.999 117.333)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='104.999'
                          cy='102.667'
                          r='1.66667'
                          transform='rotate(180 104.999 102.667)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='104.999'
                          cy='88'
                          r='1.66667'
                          transform='rotate(180 104.999 88)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='104.999'
                          cy='73.3333'
                          r='1.66667'
                          transform='rotate(180 104.999 73.3333)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='104.999'
                          cy='45'
                          r='1.66667'
                          transform='rotate(180 104.999 45)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='104.999'
                          cy='16'
                          r='1.66667'
                          transform='rotate(180 104.999 16)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='104.999'
                          cy='59'
                          r='1.66667'
                          transform='rotate(180 104.999 59)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='104.999'
                          cy='30.6666'
                          r='1.66667'
                          transform='rotate(180 104.999 30.6666)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='104.999'
                          cy='1.66665'
                          r='1.66667'
                          transform='rotate(180 104.999 1.66665)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='90.3333'
                          cy='132'
                          r='1.66667'
                          transform='rotate(180 90.3333 132)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='90.3333'
                          cy='117.333'
                          r='1.66667'
                          transform='rotate(180 90.3333 117.333)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='90.3333'
                          cy='102.667'
                          r='1.66667'
                          transform='rotate(180 90.3333 102.667)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='90.3333'
                          cy='88'
                          r='1.66667'
                          transform='rotate(180 90.3333 88)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='90.3333'
                          cy='73.3333'
                          r='1.66667'
                          transform='rotate(180 90.3333 73.3333)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='90.3333'
                          cy='45'
                          r='1.66667'
                          transform='rotate(180 90.3333 45)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='90.3333'
                          cy='16'
                          r='1.66667'
                          transform='rotate(180 90.3333 16)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='90.3333'
                          cy='59'
                          r='1.66667'
                          transform='rotate(180 90.3333 59)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='90.3333'
                          cy='30.6666'
                          r='1.66667'
                          transform='rotate(180 90.3333 30.6666)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='90.3333'
                          cy='1.66665'
                          r='1.66667'
                          transform='rotate(180 90.3333 1.66665)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='75.6654'
                          cy='132'
                          r='1.66667'
                          transform='rotate(180 75.6654 132)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='31.9993'
                          cy='132'
                          r='1.66667'
                          transform='rotate(180 31.9993 132)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='75.6654'
                          cy='117.333'
                          r='1.66667'
                          transform='rotate(180 75.6654 117.333)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='31.9993'
                          cy='117.333'
                          r='1.66667'
                          transform='rotate(180 31.9993 117.333)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='75.6654'
                          cy='102.667'
                          r='1.66667'
                          transform='rotate(180 75.6654 102.667)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='31.9993'
                          cy='102.667'
                          r='1.66667'
                          transform='rotate(180 31.9993 102.667)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='75.6654'
                          cy='88'
                          r='1.66667'
                          transform='rotate(180 75.6654 88)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='31.9993'
                          cy='88'
                          r='1.66667'
                          transform='rotate(180 31.9993 88)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='75.6654'
                          cy='73.3333'
                          r='1.66667'
                          transform='rotate(180 75.6654 73.3333)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='31.9993'
                          cy='73.3333'
                          r='1.66667'
                          transform='rotate(180 31.9993 73.3333)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='75.6654'
                          cy='45'
                          r='1.66667'
                          transform='rotate(180 75.6654 45)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='31.9993'
                          cy='45'
                          r='1.66667'
                          transform='rotate(180 31.9993 45)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='75.6654'
                          cy='16'
                          r='1.66667'
                          transform='rotate(180 75.6654 16)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='31.9993'
                          cy='16'
                          r='1.66667'
                          transform='rotate(180 31.9993 16)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='75.6654'
                          cy='59'
                          r='1.66667'
                          transform='rotate(180 75.6654 59)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='31.9993'
                          cy='59'
                          r='1.66667'
                          transform='rotate(180 31.9993 59)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='75.6654'
                          cy='30.6666'
                          r='1.66667'
                          transform='rotate(180 75.6654 30.6666)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='31.9993'
                          cy='30.6666'
                          r='1.66667'
                          transform='rotate(180 31.9993 30.6666)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='75.6654'
                          cy='1.66665'
                          r='1.66667'
                          transform='rotate(180 75.6654 1.66665)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='31.9993'
                          cy='1.66665'
                          r='1.66667'
                          transform='rotate(180 31.9993 1.66665)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='60.9993'
                          cy='132'
                          r='1.66667'
                          transform='rotate(180 60.9993 132)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='17.3333'
                          cy='132'
                          r='1.66667'
                          transform='rotate(180 17.3333 132)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='60.9993'
                          cy='117.333'
                          r='1.66667'
                          transform='rotate(180 60.9993 117.333)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='17.3333'
                          cy='117.333'
                          r='1.66667'
                          transform='rotate(180 17.3333 117.333)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='60.9993'
                          cy='102.667'
                          r='1.66667'
                          transform='rotate(180 60.9993 102.667)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='17.3333'
                          cy='102.667'
                          r='1.66667'
                          transform='rotate(180 17.3333 102.667)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='60.9993'
                          cy='88'
                          r='1.66667'
                          transform='rotate(180 60.9993 88)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='17.3333'
                          cy='88'
                          r='1.66667'
                          transform='rotate(180 17.3333 88)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='60.9993'
                          cy='73.3333'
                          r='1.66667'
                          transform='rotate(180 60.9993 73.3333)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='17.3333'
                          cy='73.3333'
                          r='1.66667'
                          transform='rotate(180 17.3333 73.3333)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='60.9993'
                          cy='45'
                          r='1.66667'
                          transform='rotate(180 60.9993 45)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='17.3333'
                          cy='45'
                          r='1.66667'
                          transform='rotate(180 17.3333 45)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='60.9993'
                          cy='16'
                          r='1.66667'
                          transform='rotate(180 60.9993 16)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='17.3333'
                          cy='16'
                          r='1.66667'
                          transform='rotate(180 17.3333 16)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='60.9993'
                          cy='59'
                          r='1.66667'
                          transform='rotate(180 60.9993 59)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='17.3333'
                          cy='59'
                          r='1.66667'
                          transform='rotate(180 17.3333 59)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='60.9993'
                          cy='30.6666'
                          r='1.66667'
                          transform='rotate(180 60.9993 30.6666)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='17.3333'
                          cy='30.6666'
                          r='1.66667'
                          transform='rotate(180 17.3333 30.6666)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='60.9993'
                          cy='1.66665'
                          r='1.66667'
                          transform='rotate(180 60.9993 1.66665)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='17.3333'
                          cy='1.66665'
                          r='1.66667'
                          transform='rotate(180 17.3333 1.66665)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='46.3333'
                          cy='132'
                          r='1.66667'
                          transform='rotate(180 46.3333 132)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='2.66536'
                          cy='132'
                          r='1.66667'
                          transform='rotate(180 2.66536 132)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='46.3333'
                          cy='117.333'
                          r='1.66667'
                          transform='rotate(180 46.3333 117.333)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='2.66536'
                          cy='117.333'
                          r='1.66667'
                          transform='rotate(180 2.66536 117.333)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='46.3333'
                          cy='102.667'
                          r='1.66667'
                          transform='rotate(180 46.3333 102.667)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='2.66536'
                          cy='102.667'
                          r='1.66667'
                          transform='rotate(180 2.66536 102.667)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='46.3333'
                          cy='88'
                          r='1.66667'
                          transform='rotate(180 46.3333 88)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='2.66536'
                          cy='88'
                          r='1.66667'
                          transform='rotate(180 2.66536 88)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='46.3333'
                          cy='73.3333'
                          r='1.66667'
                          transform='rotate(180 46.3333 73.3333)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='2.66536'
                          cy='73.3333'
                          r='1.66667'
                          transform='rotate(180 2.66536 73.3333)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='46.3333'
                          cy='45'
                          r='1.66667'
                          transform='rotate(180 46.3333 45)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='2.66536'
                          cy='45'
                          r='1.66667'
                          transform='rotate(180 2.66536 45)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='46.3333'
                          cy='16'
                          r='1.66667'
                          transform='rotate(180 46.3333 16)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='2.66536'
                          cy='16'
                          r='1.66667'
                          transform='rotate(180 2.66536 16)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='46.3333'
                          cy='59'
                          r='1.66667'
                          transform='rotate(180 46.3333 59)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='2.66536'
                          cy='59'
                          r='1.66667'
                          transform='rotate(180 2.66536 59)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='46.3333'
                          cy='30.6666'
                          r='1.66667'
                          transform='rotate(180 46.3333 30.6666)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='2.66536'
                          cy='30.6666'
                          r='1.66667'
                          transform='rotate(180 2.66536 30.6666)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='46.3333'
                          cy='1.66665'
                          r='1.66667'
                          transform='rotate(180 46.3333 1.66665)'
                          fill='var(--color-primary-100)'
                        />
                        <circle
                          cx='2.66536'
                          cy='1.66665'
                          r='1.66667'
                          transform='rotate(180 2.66536 1.66665)'
                          fill='var(--color-primary-100)'
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'contact'])),
    },
  };
};

export default ContactPage;
