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

import heroImg from '/public/images/production/duecker-medizintechnik_production_hero-bg.jpg';

const ProductionPage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  return (
    <Layout>
      <Seo templateTitle='Produktion' />
      <main className='py-8'>
        <Container>
          <div className='mb-12 flex flex-row gap-6 items-start py-12'>
            <div className='mb-12 w-full lg:mb-0 lg:w-2/3 xl:w-1/2'>
              <div className='text-dark'>
                <span className='mb-4 inline-block p-2 rounded-full bg-purple-50 text-xs font-semibold text-purple-900'>
                  PRODUKTION
                </span>
                <Title isAnimated>
                  Wir unterstützen Ihre Deployments durch unsere Produktion
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
                  <li className='mb-3 flex items-center'>
                    <VscCheck className='mr-4 h-4 w-4 text-primary-500' />
                    <span>Qualitätsstandards</span>
                  </li>
                  <li className='mb-3 flex items-center'>
                    <VscCheck className='mr-4 h-4 w-4 text-primary-500' />
                    <span>Arthroskopische Lösungen</span>
                  </li>
                  <li className='flex items-center'>
                    <VscCheck className='mr-4 h-4 w-4 text-primary-500' />
                    <span>Unsterile Bulk-Lieferungen</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className='w-full lg:w-1/3 xl:w-1/2'>
              <div className='pl-5'>
                <Image
                  src='/images/production/duecker-medizintechnik_production_grid-bg.jpg'
                  width={2000}
                  height={2000}
                  className='object-cover object-center '
                  alt=''
                />
              </div>
            </div>
          </div>

          <div className='mb-12 py-12 flex flex-row gap-6'>
            <div className='w-full xl:w-1/2'>
              <div className='flex h-full flex-wrap'>
                <div className='mb-8 w-full md:mb-0 md:w-1/2'>
                  <div className='flex h-full flex-col'>
                    <a
                      className='relative mb-7 block h-full bg-primary-50 px-8 pb-5 pt-8 transition duration-200 hover:bg-primary-100'
                      href='#'
                    >
                      <div className='flex h-full max-w-sm flex-col justify-between pr-16'>
                        <p className='mb-10 text-sm text-gray-900 md:mb-6'>
                          We have share our journey and some story
                        </p>
                        <span className='text-3xl font-semibold text-gray-900'>
                          Read our blog
                        </span>
                      </div>
                    </a>
                    <a
                      className='relative block h-full bg-purple-50 px-8 pb-5 pt-8 transition duration-200 hover:bg-purple-100'
                      href='#'
                    >
                      <div className='flex h-full max-w-sm flex-col justify-between pr-16'>
                        <p className='mb-10 text-sm text-gray-900 md:mb-6'>
                          It’s a must to that we would like to share our
                          workflow to believe you
                        </p>
                        <span className='text-3xl font-semibold text-gray-900'>
                          See our workflow
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
                <div className='w-full px-4 md:w-1/2'>
                  <a
                    className='relative block h-full bg-orange-50 px-8 pb-5 pt-8 transition duration-200 hover:bg-orange-100'
                    href='#'
                  >
                    <div className='flex h-full max-w-sm flex-col items-start justify-between pr-16'>
                      <p className='mb-10 text-sm text-gray-900 md:mb-6'>
                        2,000+ our team members around the world who create
                        incredible and amazing projects
                      </p>
                      <span className='text-3xl font-semibold text-gray-900'>
                        Meet Our Expert
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className='mb-8 w-full px-4 xl:mb-0 xl:w-1/2'>
              <Title>
                Wir unterstützen Ihre Deployments durch unsere Produktion
              </Title>
              <p className='mb-3'>
                Mit unserem umfangreichen Sortiment sind wir in der Lage, die
                vielfältigen Anforderungen unserer internationalen Kunden,
                insbesondere Setpacker, zu erfüllen, die auf unsere unsterilen
                Bulk-Lieferungen zurückgreifen, um ihre OP-Trays zu
                komplettieren.
              </p>
              <p className='font-semibold text-dark'>
                Augue justo at convallis vitae nunc maecenas est. Viverra duis
                feugiat posuere vitae tincidunt.
              </p>
            </div>
          </div>
          <ImageBanner
            role='hero'
            delay={0}
            priority={true}
            src={heroImg}
            className='flex-1 mb-12'
          />
        </Container>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'de', ['common', 'production'])),
  },
});

export default ProductionPage;
