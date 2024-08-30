import { useAnimate } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { VscArrowRight } from 'react-icons/vsc';

import { Container } from '@/components/layout/Container';
import { AspectRatio, Body, Title, UnstyledLink } from '@/components/ui';

import { Distribution, Production, Repair } from './StickyScrollCard';
import { StickyScrollTitle } from './StickyScrollTitle';

import distributionStickyImg from '/public/images/home/sticky-scroll/sticky-scroll_image-distribution.webp';
import productionStickyImg from '/public/images/home/sticky-scroll/sticky-scroll_image-production.jpg';
import repairStickyImg from '/public/images/home/sticky-scroll/sticky-scroll_image-repair.jpg';

const stickyScroll = [
  {
    id: 'production',
    card: Production,
    img: productionStickyImg,
  },
  {
    id: 'repair',
    card: Repair,
    img: repairStickyImg,
  },
  {
    id: 'distribution',
    card: Distribution,
    img: distributionStickyImg,
  },
];

export const StickyScroll = () => {
  const { t } = useTranslation('home');
  const [scope] = useAnimate();

  const DesktopStickyScroll = () => {
    return (
      <>
        <section className='hidden bg-gray-50 lg:block lg:min-h-[calc(100vh_-_var(--navigation-height))]'>
          <Container>
            <div className='pt-16 md:pt-24 lg:pt-32'>
              <div className='-mx-4 flex flex-wrap'>
                <div className='w-full px-4'>
                  <div className='mx-auto max-w-5xl text-center'>
                    <Title renderAs='h2'>
                      {t('content.stickyScroll.title')}
                    </Title>
                  </div>
                </div>
              </div>
            </div>
          </Container>
          <Container>
            <div ref={scope}>
              <div className='w-full items-start lg:flex lg:gap-x-32'>
                <div className='bottom-8 right-8 z-40 flex h-64 w-64 items-center md:h-96 md:w-96 lg:sticky lg:top-0 lg:h-[calc(100vh_+_var(--navigation-height))] lg:w-full'>
                  <div className='relative aspect-square w-full bg-white opacity-0 transition-opacity duration-200 lg:block lg:opacity-100 [&:has(>_.active-card)]:opacity-100 lg:[&:has(>_.active-card)]:bg-transparent'>
                    {stickyScroll.map((feature) => (
                      <feature.card id={feature.id} key={feature.id} />
                    ))}
                  </div>
                </div>
                <div className='w-full py-[15vh] lg:py-[50vh]'>
                  <ul>
                    {stickyScroll.map((feature) => (
                      <li key={feature.id}>
                        <StickyScrollTitle id={feature.id}>
                          {t(
                            ('content.stickyScroll.' +
                              feature.id +
                              '.text') as never,
                          )}
                        </StickyScrollTitle>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </>
    );
  };

  // TODO: Implement mobile version
  // eslint-disable-next-line unused-imports/no-unused-vars
  const MobileStickyScroll = () => {
    return (
      <>
        <section className='block bg-gray-50 py-16 md:py-32 lg:hidden'>
          <Container>
            <div className='mb-8'>
              <Title size='two'>{t('content.stickyScroll.title')}</Title>
              <Body>{t('content.stickyScroll.text')}</Body>
            </div>
            {stickyScroll.map((feature) => (
              <div
                key={feature.id}
                className='relative my-4 block overflow-hidden'
              >
                <UnstyledLink
                  href={
                    '/leistungen/' +
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    t('content.stickyScroll.' + feature.id + '.href')
                  }
                >
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={feature.img}
                      alt={feature.id}
                      placeholder='blur'
                      priority
                      quality={90}
                    />
                  </AspectRatio>
                  <div className='absolute bottom-0 left-0 w-full p-2'>
                    <span className='text-white'>
                      {t(
                        ('content.stickyScroll.' +
                          feature.id +
                          '.title') as never,
                      )}{' '}
                      <VscArrowRight className='relative -top-0.5 inline-block text-white' />
                    </span>
                    <Title
                      renderAs='h3'
                      size='five'
                      className='line-clamp-1 font-normal text-white'
                      margin={false}
                    >
                      {t(
                        ('content.stickyScroll.' +
                          feature.id +
                          '.text') as never,
                      )}
                    </Title>
                  </div>
                </UnstyledLink>
              </div>
            ))}
          </Container>
        </section>
      </>
    );
  };

  return (
    <>
      <DesktopStickyScroll />
      {/* <MobileStickyScroll /> */}
    </>
  );
};
