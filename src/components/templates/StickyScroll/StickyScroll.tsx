// TODO: Add buttons for navigation
// TODO: Remove spotify.webp

import { stagger, useAnimate } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';

import { Container } from '@/components/layout/Container';
import { AnimatedBadge } from '@/components/ui/AnimatedBadge';
import { Title } from '@/components/ui/typography/Title';

import { useHidePageOverflow } from '@/utils/toggle-page-overflow';
import { useEscapePress } from '@/utils/use-escape-press';

import { Commerce, Production, Repair } from './StickyScrollCard';
import { StickyScrollTitle } from './StickyScrollTitle';
import { useFeatureStore } from './store';

const stickyScroll = [
  {
    id: 'production',
    card: Production,
  },
  {
    id: 'repair',
    card: Repair,
  },
  {
    id: 'commerce',
    card: Commerce,
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

  return (
    <section className='bg-primary-50 lg:min-h-[calc(100vh_-_var(--navigation-height))]'>
      <Container>
        <div className='pt-16 md:pt-32'>
          <div className='-mx-4 flex flex-wrap'>
            <div className='w-full px-4'>
              <div className='mx-auto mb-12 max-w-4xl text-center lg:mb-20'>
                <AnimatedBadge text='Lorem ipsum dolor sit amet.' />
                <Title margin={false} className='mb-4'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Distinctio, quibusdam.
                </Title>
                <p className='text-sm text-gray-500 md:text-base'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Asperiores assumenda atque culpa cumque, dignissimos ea
                  eveniet facere incidunt ipsam nobis odit quibusdam veritatis?
                  Ab distinctio laudantium molestias natus obcaecati
                  perspiciatis quidem tempora velit! Architecto culpa debitis
                  dolorum earum error eum ex excepturi impedit incidunt
                  inventore ipsam ipsum itaque minus?
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container>
        <div ref={scope}>
          <div className='w-full items-start lg:flex lg:gap-x-32'>
            <div className='fixed bottom-8 right-8 z-40 flex h-64 w-64 items-center md:h-96 md:w-96 lg:sticky lg:top-0 lg:h-[calc(100vh_+_var(--navigation-height))] lg:w-full'>
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
  );
};
