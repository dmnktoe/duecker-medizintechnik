import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { VscArrowRight, VscCloudDownload } from 'react-icons/vsc';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';
import ImageBanner from '@/components/templates/ImageBanner/ImageBanner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import NextBreadcrumb from '@/components/ui/Breadcrumb';
import PrimaryLink from '@/components/ui/links/PrimaryLink';
import { Title } from '@/components/ui/typography/Title';

import heroImg from '/public/images/downloads/duecker-medizintechnik_downloads_hero-bg.webp';

const DownloadsPage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  return (
    <Layout>
      <Seo templateTitle='Reparatur' />
      <ImageBanner
        role='hero'
        delay={0}
        priority={true}
        src={heroImg}
        className='flex-1'
      />
      <main className='py-16 lg:py-24'>
        <Container>
          <div className='mx-auto mb-16 max-w-5xl'>
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
            <Title margin={false}>Downloads & Zertifikate</Title>
            <p>
              Hier finden Sie alle wichtigen Dokumente und Zertifikate zum
              Download.
            </p>
            <hr className='my-12' />
            <div className='mb-12 flex flex-col'>
              <Title
                renderAs='h2'
                size='three'
                margin={false}
                className='mb-2 text-primary-500'
              >
                Zertifikate
              </Title>
              <Accordion type='single'>
                <AccordionItem value='item-1'>
                  <AccordionTrigger className='bg-gray-100 px-4 text-2xl'>
                    EN ISO 13485:2016
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className='mt-4 flex flex-col gap-2'>
                      <div className='w-full border-[1px] border-solid border-gray-100 p-4 text-dark'>
                        <div className='flex flex-row justify-between'>
                          <PrimaryLink
                            className='text-base'
                            href='/downloads/EN_ISO_13485_2016.pdf'
                          >
                            EN ISO 13485:2016
                          </PrimaryLink>
                          <div className='flex flex-row items-center gap-3'>
                            <span className='text-light text-sm'>
                              pdf, 778.99 KB
                            </span>
                            <PrimaryLink
                              className='text-base'
                              href='/downloads/EN_ISO_13485_2016.pdf'
                            >
                              <VscCloudDownload className='h-6 w-6' />
                            </PrimaryLink>
                          </div>
                        </div>
                      </div>
                      <div className='w-full border-[1px] border-solid border-gray-100 p-4 text-dark'>
                        <PrimaryLink
                          className='text-base'
                          href='/downloads/EN_ISO_13485_2016.pdf'
                        >
                          EN ISO 13485:2016
                        </PrimaryLink>
                      </div>
                      <div className='w-full border-[1px] border-solid border-gray-100 p-4 text-dark'>
                        <PrimaryLink
                          className='text-base'
                          href='/downloads/EN_ISO_13485_2016.pdf'
                        >
                          EN ISO 13485:2016
                        </PrimaryLink>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-2'>
                  <AccordionTrigger className='bg-gray-100 px-4 text-2xl'>
                    93/42/EWG
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-3'>
                  <AccordionTrigger className='bg-gray-100 px-4 text-2xl'>
                    Ökostrom
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className='mb-12 flex flex-col'>
              <Title
                renderAs='h2'
                size='three'
                margin={false}
                className='mb-2 text-primary-500'
              >
                Handhabungshinweise
              </Title>
              <Accordion type='single'>
                <AccordionItem value='item-1'>
                  <AccordionTrigger className='bg-gray-100 px-4 text-2xl'>
                    EN ISO 13485:2016
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-2'>
                  <AccordionTrigger className='bg-gray-100 px-4 text-2xl'>
                    93/42/EWG
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-3'>
                  <AccordionTrigger className='bg-gray-100 px-4 text-2xl'>
                    Ökostrom
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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
      ...(await serverSideTranslations(locale ?? 'de', [
        'common',
        'downloads',
      ])),
    },
  };
};

export default DownloadsPage;
