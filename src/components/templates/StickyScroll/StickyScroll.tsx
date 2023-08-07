import { stagger, useAnimate } from 'framer-motion';
import { useEffect } from 'react';

import { Container } from '@/components/layout/Container';

import { useHidePageOverflow } from '@/utils/toggle-page-overflow';
import { useEscapePress } from '@/utils/use-escape-press';

import { Commerce, Music, Production, Repair } from './Card';
import { useFeatureStore } from './store';
import { FeatureTitle } from './Title';
import { MusicVisual, OtherVisual } from './Visual';

const stickyScroll = [
  {
    title: 'Produktion nach höchstem Maßstab.',
    id: 'production',
    card: Production,
    visual: OtherVisual,
  },
  {
    title: 'Reparatur und Wartung von Medizinprodukten.',
    id: 'repair',
    card: Repair,
    visual: OtherVisual,
  },
  {
    title: 'Handel mit Medizinprodukten.',
    id: 'commerce',
    card: Commerce,
    visual: OtherVisual,
  },
  {
    title: 'Track what you listened to when',
    id: 'music',
    card: Music,
    visual: MusicVisual,
  },
];

export const StickyScroll = () => {
  const [scope, animate] = useAnimate();
  const fullscreenFeature = useFeatureStore((state) => state.fullscreenFeature);
  const lastFullscreenFeature = useFeatureStore(
    (state) => state.lastFullscreenFeature
  );
  const setFullscreenFeature = useFeatureStore(
    (state) => state.setFullscreenFeature
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
    <section className='min-h-full'>
      <Container>
        <div ref={scope}>
          {stickyScroll.map((feature) => (
            <feature.visual id={feature.id} key={feature.id} />
          ))}
          <button
            onClick={() => setFullscreenFeature(null)}
            className='back-to-site-btn fixed bottom-6 left-1/2 z-10 -translate-x-1/2 translate-y-[300%] rounded-full bg-black px-4 py-2 text-white opacity-0 shadow-lg'
          >
            Back to site
          </button>
          <div className='flex w-full items-start gap-x-48'>
            <div className='sticky top-0 flex h-screen w-full items-center'>
              <div className='relative aspect-square w-full rounded-2xl bg-gray-100 [&:has(>_.active-card)]:bg-transparent'>
                {stickyScroll.map((feature) => (
                  <feature.card id={feature.id} key={feature.id} />
                ))}
              </div>
            </div>
            <div className='w-full py-[50vh]'>
              <ul>
                {stickyScroll.map((feature) => (
                  <li key={feature.id}>
                    <FeatureTitle id={feature.id}>{feature.title}</FeatureTitle>
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
