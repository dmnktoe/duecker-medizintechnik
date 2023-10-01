'use client';
import { Player } from '@lottiefiles/react-lottie-player';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { VscArrowRight, VscCheck } from 'react-icons/vsc';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';
import ImageBanner from '@/components/templates/ImageBanner/ImageBanner';
import { AspectRatio } from '@/components/ui/AspectRatio';
import NextBreadcrumb from '@/components/ui/Breadcrumb';
import UnderlineLink from '@/components/ui/links/UnderlineLink';
import { Title } from '@/components/ui/typography/Title';

import heroImg from '/public/images/commerce/duecker-medizintechnik_commerce_hero-bg.webp';
import animation from '/public/images/commerce/package-rotate_lottie.json';

const CommercePage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const animationURL = animation;

  return (
    <Layout>
      <Seo templateTitle='Handel' />
      <ImageBanner
        role='hero'
        delay={0}
        priority={true}
        src={heroImg}
        className='flex-1'
      />
      <main className='py-16 lg:py-24'>
        <Container>
          <NextBreadcrumb
            homeElement='Startseite'
            separator={<VscArrowRight className='mr-2 h-6 w-3' />}
            activeClasses='text-primary-500'
            containerClasses='flex'
            listClasses='hover:underline mr-2'
            capitalizeLinks
            className='mb-6'
          />
          <div className='mb-16 flex flex-col items-start md:flex-row md:gap-6 lg:mb-24'>
            <div className='mb-6 w-full lg:mb-0 lg:w-2/3 xl:w-1/2'>
              <div className='text-dark'>
                <Title isAnimated>
                  Ein ganzes Universum innovativer Lösungen von Medizintechnik
                  bis Logistik
                </Title>
                <p className='text-base'>
                  Mit unseren ausgewählten Handelspartnern bieten wir Ihnen ein
                  leistungsstarkes Netzwerk von Produkten und Dienstleistungen.
                  Von chirurgischem Instrumentarium, HF-Chirurgische Instrumente
                  über Orthopädische Shaver-Systemen, Pumpen und Bildgebenden
                  Systemen bis hin zu Logistik Lösungen, Zubehör für die AEMP
                  und Neurochirurgischen Bohrsystemen bieten wir ein komplettes
                  Gesamtpaket an innovativen Lösungen.
                </p>
                <h5 className='my-6 font-semibold'>Unsere Handelspartner:</h5>
                <ul className='mb-6 flex flex-row gap-6'>
                  <div>
                    <li className='mb-3 flex items-center'>
                      <VscCheck className='mr-4 h-4 w-4 text-primary-500' />
                      <UnderlineLink href='https://medicon.de/'>
                        Medicon
                      </UnderlineLink>
                    </li>
                    <li className='mb-3 flex items-center'>
                      <VscCheck className='mr-4 h-4 w-4 text-primary-500' />
                      <UnderlineLink href='https://www.bissinger-medizintechnik.de/'>
                        Bissinger
                      </UnderlineLink>
                    </li>
                    <li className='flex items-center'>
                      <VscCheck className='mr-4 h-4 w-4 text-primary-500' />
                      <UnderlineLink href='https://medicon.de/'>
                        Eberle
                      </UnderlineLink>
                    </li>
                  </div>
                  <div>
                    <li className='mb-3 flex items-center'>
                      <VscCheck className='mr-4 h-4 w-4 text-primary-500' />
                      <UnderlineLink href='https://medicon.de/'>
                        Hupfer
                      </UnderlineLink>
                    </li>
                    <li className='mb-3 flex items-center'>
                      <VscCheck className='mr-4 h-4 w-4 text-primary-500' />
                      <UnderlineLink href='https://medicon.de/'>
                        Key Surgical
                      </UnderlineLink>
                    </li>
                    <li className='flex items-center'>
                      <VscCheck className='mr-4 h-4 w-4 text-primary-500' />
                      <UnderlineLink href='https://medicon.de/'>
                        Nouvag
                      </UnderlineLink>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
            <div className='w-full lg:w-1/3 xl:w-1/2'>
              <div className='md:pl-5'>
                <AspectRatio ratio={1}>
                  <div className='flex h-full bg-gray-100'>
                    <Player src={animationURL} autoplay loop speed={1} />
                  </div>
                </AspectRatio>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'de', ['common', 'commerce'])),
  },
});

export default CommercePage;
