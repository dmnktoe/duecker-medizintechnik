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
              separator={<VscArrowRight className='h-6 w-3 mr-2' />}
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
                className='text-primary-500 mb-2'
              >
                Zertifikate
              </Title>
              <Accordion type='single'>
                <AccordionItem value='item-1'>
                  <AccordionTrigger className='text-2xl bg-gray-100 px-4'>
                    EN ISO 13485:2016
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className='flex flex-col gap-2 mt-4'>
                      <div className='border-solid border-gray-100 border-[1px] text-dark p-4 w-full'>
                        <div className='flex flex-row justify-between'>
                          <PrimaryLink
                            className='text-base'
                            href='/downloads/EN_ISO_13485_2016.pdf'
                          >
                            EN ISO 13485:2016
                          </PrimaryLink>
                          <div className='flex flex-row gap-3 items-center'>
                            <span className='text-sm text-light'>
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
                      <div className='border-solid border-gray-100 border-[1px] text-dark p-4 w-full'>
                        <PrimaryLink
                          className='text-base'
                          href='/downloads/EN_ISO_13485_2016.pdf'
                        >
                          EN ISO 13485:2016
                        </PrimaryLink>
                      </div>
                      <div className='border-solid border-gray-100 border-[1px] text-dark p-4 w-full'>
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
                  <AccordionTrigger className='text-2xl bg-gray-100 px-4'>
                    93/42/EWG
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-3'>
                  <AccordionTrigger className='text-2xl bg-gray-100 px-4'>
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
                className='text-primary-500 mb-2'
              >
                Handhabungshinweise
              </Title>
              <Accordion type='single'>
                <AccordionItem value='item-1'>
                  <AccordionTrigger className='text-2xl bg-gray-100 px-4'>
                    EN ISO 13485:2016
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-2'>
                  <AccordionTrigger className='text-2xl bg-gray-100 px-4'>
                    93/42/EWG
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-3'>
                  <AccordionTrigger className='text-2xl bg-gray-100 px-4'>
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
