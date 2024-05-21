import { stagger, useAnimate } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';
import { VscArrowRight } from 'react-icons/vsc';

import { Container } from '@/components/layout/Container';
import { AspectRatio } from '@/components/ui/AspectRatio';
import { AnimatedBadge } from '@/components/ui/Badges/AnimatedBadge';
import UnstyledLink from '@/components/ui/Links/UnstyledLink';
import { Body, Title } from '@/components/ui/Typography';

import { useHidePageOverflow } from '@/utils/toggle-page-overflow';
import { useEscapePress } from '@/utils/use-escape-press';

import { Distribution, Production, Repair } from './StickyScrollCard';
import { StickyScrollTitle } from './StickyScrollTitle';
import { useFeatureStore } from './store';

import distributionStickyImg from '/public/images/home/sticky-scroll/sticky-scroll_image-distribution.jpg';
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
  const [scope, animate] = useAnimate();
  const fullscreenFeature = useFeatureStore((state) => state.fullscreenFeature);
  const lastFullscreenFeature = useFeatureStore(
    (state) => state.lastFullscreenFeature,
  );
  const setFullscreenFeature = useFeatureStore(
    (state) => state.setFullscreenFeature,
  );

  const onEscapePress = () => {
    if (fullscreenFeature) setFullscreenFeature(null);
  };

  useEscapePress(onEscapePress);
  useHidePageOverflow(!!fullscreenFeature);

  useEffect(() => {
    if (fullscreenFeature) {
      animate([
        [
          '.feature-title',
          { opacity: 0, x: '-200px' },
          { duration: 0.3, delay: stagger(0.05) },
        ],
        [
          `.visual-${lastFullscreenFeature}`,
          { opacity: 1, scale: 1, pointerEvents: 'auto' },
          { at: '<' },
        ],
        ['.active-card .gradient', { opacity: 0, scale: 0 }, { at: '<' }],
        ['.active-card .show-me-btn', { opacity: 0 }, { at: '<' }],
        [
          '.back-to-site-btn',
          { opacity: 1, y: '0px' },
          { at: '<', duration: 0.3 },
        ],
      ]);
    } else {
      animate([
        [
          '.feature-title',
          { opacity: 1, x: '0px' },
          { duration: 0.3, delay: stagger(0.05) },
        ],
        [
          `.visual-${lastFullscreenFeature}`,
          { opacity: 0, scale: 0.75, pointerEvents: 'none' },
          { at: '<' },
        ],
        ['.active-card .gradient', { opacity: 1, scale: 1 }, { at: '<' }],
        [
          '.back-to-site-btn',
          { opacity: 0, y: '300px' },
          { at: '<', duration: 0.3 },
        ],
        ['.active-card .show-me-btn', { opacity: 1 }],
      ]);
    }
  }, [animate, fullscreenFeature, lastFullscreenFeature]);

  const DesktopStickyScroll = () => {
    return (
      <>
        <section className='hidden bg-gray-50 lg:block lg:min-h-[calc(100vh_-_var(--navigation-height))]'>
          <Container>
            <div className='pt-16 md:pt-32'>
              <div className='-mx-4 flex flex-wrap'>
                <div className='w-full px-4'>
                  <div className='mx-auto max-w-5xl text-center'>
                    <AnimatedBadge text={t('content.stickyScroll.badge')} />
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

  const MobileStickyScroll = () => {
    return (
      <>
        <section className='block bg-gray-50 py-16 md:py-32 lg:hidden'>
          <Container>
            <div className='mb-8'>
              <AnimatedBadge text={t('content.stickyScroll.badge')} />
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
                      quality={65}
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
      <MobileStickyScroll />
    </>
  );
};
