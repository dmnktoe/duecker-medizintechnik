import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { VscCheck } from 'react-icons/vsc';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';
import ImageBanner from '@/components/templates/ImageBanner/ImageBanner';
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
      <main className='py-8'>
        <Container>
          <div className='mb-12 flex flex-row gap-6 items-start py-12'>
            <div className='mb-12 w-full lg:mb-0 lg:w-2/3 xl:w-1/2'>
              <div className='text-dark'>
                <span className='mb-4 inline-block p-2 rounded-full bg-purple-50 text-xs font-semibold text-purple-900'>
                  REPERATUR
                </span>
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
                  Ihr vertrauenswürdiger Partner
                </h5>
                <ul className='mb-6'>
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
            <div className='w-full lg:w-1/3 xl:w-1/2'>
              <div className='pl-5'>
                <Image
                  src='/images/repair/produktion_grid-bg.jpg'
                  width={2000}
                  height={2000}
                  className='object-cover object-center '
                  alt=''
                />
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
    ...(await serverSideTranslations(locale ?? 'de', ['common', 'repair'])),
  },
});

export default RepairPage;
