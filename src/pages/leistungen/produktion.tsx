import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { VscCheck } from 'react-icons/vsc';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';

const ProductionPage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  return (
    <Layout>
      <Seo templateTitle='Produktion' />
      <Container>
        <div className='mb-8 flex flex-wrap items-center py-12'>
          <div className='mb-12 w-full lg:mb-0 lg:w-2/3 xl:w-1/2'>
            <div>
              <span className='mb-4 inline-block rounded-full bg-orange-50 text-xs font-semibold text-orange-900'>
                PRODUKTION
              </span>
              <h1 className='font-heading xs:text-6xl text-5xl font-bold text-gray-900 md:text-7xl'>
                <span>Sterile Schlauchsysteme</span>
              </h1>
            </div>
          </div>
          <div className='w-full px-4 lg:w-1/3 xl:w-1/2'>
            <div className='max-w-sm lg:ml-auto'>
              <p className='text-lg text-gray-500'>
                We are a team of 20+ who are passionate about making the world a
                better place.
              </p>
            </div>
          </div>
        </div>
        <div className='-mx-4 flex flex-wrap'>
          <div className='mb-8 w-full px-4 xl:mb-0 xl:w-1/2'>
            <div className='h-100 md:h-125 relative'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className='block h-full w-full rounded-3xl object-cover'
                src='/images/produktion/produktion_grid-bg.jpg'
                alt=''
              />
              <div className='absolute left-0 top-0 h-full w-full p-8 md:p-12'>
                <div className='flex h-full max-w-sm flex-col items-start justify-between'>
                  <div>
                    <span className='text-primary-500 mb-3 block text-sm font-semibold uppercase'>
                      Qualitätsstandards
                    </span>
                    <h3 className='text-3xl font-semibold text-white md:text-4xl'>
                      Leveraging tech to drive a better IT experience
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full xl:w-1/2'>
            <div className='flex h-full flex-wrap'>
              <div className='mb-8 w-full px-4 md:mb-0 md:w-1/2'>
                <div className='flex h-full flex-col'>
                  <a
                    className='relative mb-7 block h-full rounded-3xl bg-green-50 px-8 pb-5 pt-8 transition duration-200 hover:bg-green-100'
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className='absolute bottom-0 right-0 m-5'
                      src='saturn-assets/images/stickyScroll/arrow.svg'
                      alt=''
                    />
                  </a>
                  <a
                    className='relative block h-full rounded-3xl bg-red-50 px-8 pb-5 pt-8 transition duration-200 hover:bg-red-100'
                    href='#'
                  >
                    <div className='flex h-full max-w-sm flex-col justify-between pr-16'>
                      <p className='mb-10 text-sm text-gray-900 md:mb-6'>
                        It’s a must to that we would like to share our workflow
                        to believe you
                      </p>
                      <span className='text-3xl font-semibold text-gray-900'>
                        See our workflow
                      </span>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className='absolute bottom-0 right-0 m-5'
                      src='saturn-assets/images/stickyScroll/arrow.svg'
                      alt=''
                    />
                  </a>
                </div>
              </div>
              <div className='w-full px-4 md:w-1/2'>
                <a
                  className='relative block h-full rounded-3xl bg-orange-50 px-8 pb-5 pt-8 transition duration-200 hover:bg-orange-100'
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className='absolute bottom-0 right-0 m-5'
                    src='saturn-assets/images/stickyScroll/arrow.svg'
                    alt=''
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-wrap'>
          <div className='mb-12 w-full lg:mb-0 lg:w-1/2'>
            <div className='mx-auto max-w-md md:max-w-lg lg:mx-0'>
              <span className='mb-4 inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-900'>
                RICH TEXT MODULE
              </span>
              <h1 className='font-heading xs:text-6xl mb-12 text-4xl font-bold text-gray-900 md:text-7xl'>
                <span className='block'>Internationale Setpacker</span>
              </h1>
              <p className='xs:text-3xl mb-6 max-w-md text-lg font-semibold text-gray-400'>
                Mit unserem umfangreichen Sortiment sind wir in der Lage, die
                vielfältigen Anforderungen unserer internationalen Kunden,
                insbesondere Setpacker, zu erfüllen, die auf unsere unsterilen
                Bulk-Lieferungen zurückgreifen, um ihre OP-Trays zu
                komplettieren.
              </p>
              <p className='xs:text-3xl max-w-md text-lg font-semibold text-gray-400'>
                Augue justo at convallis vitae nunc maecenas est. Viverra duis
                feugiat posuere vitae tincidunt.
              </p>
            </div>
          </div>
          <div className='w-full px-4 lg:w-1/2'>
            <div className='mx-auto max-w-md md:max-w-lg lg:mr-0'>
              <h3 className='xs:text-3xl mb-6 text-xl font-semibold text-gray-800'>
                Ihr vertrauenswürdiger Partner
              </h3>
              <ul className='mb-6'>
                <li className='mb-6 flex items-center'>
                  <VscCheck className='mr-4 h-6 w-6' />
                  <span className='xs:text-lg text-base font-semibold text-gray-900'>
                    Qualitätsstandards
                  </span>
                </li>
                <li className='mb-6 flex items-center'>
                  <VscCheck className='mr-4 h-6 w-6' />
                  <span className='xs:text-lg text-base font-semibold text-gray-900'>
                    Arthroskopische Lösungen
                  </span>
                </li>
                <li className='flex items-center'>
                  <VscCheck className='mr-4 h-6 w-6' />
                  <span className='xs:text-lg text-base font-semibold text-gray-900'>
                    Unsterile Bulk-Lieferungen
                  </span>
                </li>
              </ul>
              <p className='mb-5 text-lg text-gray-700'>
                Als Hersteller von sterilen und unsterilen Schlauchsystemen sind
                wir seit Jahren im Markt etabliert. Unser Produktportfolio
                erstreckt sich über Schwerkraft-Schlauchsets bis hin zu Systemen
                für arthroskopische Rollenpumpen. Internationale Setpacker
                profitieren von unseren unsterilen Bulk-Lieferungen, um Ihre
                OP-Trays zu komplettieren.
              </p>
              <p className='mb-8 text-lg text-gray-700'>
                Unsere ISO Klasse 8 Produktion erfüllt die hohen Ansprüche an
                die geforderten Umgebungsbedingungen und wird regelmäßig durch
                externe, akkreditierte Labore kontrolliert. Diese hohen
                Qualitätsstandards bilden das Fundament unseres Schaffens.
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className='block w-full'
                src='saturn-assets/images/content/photo-content2.png'
                alt=''
              />
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'de', ['common', 'home'])),
  },
});

export default ProductionPage;
