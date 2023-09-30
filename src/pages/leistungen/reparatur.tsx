import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { VscArrowRight, VscCheck } from 'react-icons/vsc';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';
import ImageBanner from '@/components/templates/ImageBanner/ImageBanner';
import NextBreadcrumb from '@/components/ui/Breadcrumb';
import { Title } from '@/components/ui/typography/Title';

import heroImg from '/public/images/repair/duecker-medizintechnik_repair_hero-bg.webp';

const RepairPage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
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
      <main className='py-16 lg:py-24 mb-16'>
        <Container>
          <NextBreadcrumb
            homeElement='Startseite'
            separator={<VscArrowRight className='h-6 w-3 mr-2' />}
            activeClasses='text-primary-500'
            containerClasses='flex'
            listClasses='hover:underline mr-2'
            capitalizeLinks
            className='mb-6'
          />
          <div className='flex flex-row gap-6 items-start'>
            <div className='mb-12 w-full lg:mb-0 '>
              <div className='text-dark'>
                <Title isAnimated>
                  Durch unseren eigenen Reparaturservice garantieren wir eine
                  schnelle Bearbeitung Ihrer Reparaturaufträge
                </Title>
                <p className='text-base'>
                  Als Hersteller von sterilen und unsterilen Schlauchsystemen
                  sind wir seit Jahren im Markt etabliert. Unser
                  Produktportfolio erstreckt sich über Schwerkraft-Schlauchsets
                  bis hin zu Systemen für arthroskopische Rollenpumpen.
                  Internationale Setpacker profitieren von unseren unsterilen
                  Bulk-Lieferungen, um Ihre OP-Trays zu komplettieren. Unsere
                  ISO Klasse 8 Produktion erfüllt die hohen Ansprüche an die
                  geforderten Umgebungsbedingungen und wird regelmäßig durch
                  externe, akkreditierte Labore kontrolliert. Diese hohen
                  Qualitätsstandards bilden das Fundament unseres Schaffens.
                </p>
                <h5 className='font-semibold my-6'>
                  Ihr vertrauenswürdiger Partner für
                </h5>
                <ul>
                  <li className='mb-4 flex items-center'>
                    <VscCheck className='mr-4 h-4 w-4 text-primary-500' />
                    <span>Qualitätsstandards</span>
                  </li>
                  <li className='mb-4 flex items-center'>
                    <VscCheck className='mr-4 h-4 w-4' />
                    <span>Arthroskopische Lösungen</span>
                  </li>
                  <li className='flex items-center'>
                    <VscCheck className='mr-4 h-4 w-4' />
                    <span>Unsterile Bulk-Lieferungen</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className='w-full hidden lg:block lg:w-1/3 xl:w-1/2'>
              <div className='pl-5'></div>
            </div>
          </div>
        </Container>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'de', ['common', 'repair'])),
  },
});

export default RepairPage;
