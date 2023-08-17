import clsx from 'clsx';
import { motion } from 'framer-motion';

import { Logo } from '@/components/icons/logo';
import NextImage from '@/components/NextImage';

import { useFeatureStore } from './store';

type FeatureCardProps = {
  gradient: string;
  children: React.ReactNode;
} & CardProps;

type CardProps = {
  id: string;
};

const FeatureCard = ({ gradient, children, id }: FeatureCardProps) => {
  const inViewFeature = useFeatureStore((state) => state.inViewFeature);
  const setFullscreenFeature = useFeatureStore(
    (state) => state.setFullscreenFeature
  );

  return (
    <div
      className={clsx(
        'absolute inset-0 h-full w-full overflow-hidden rounded-2xl transition-opacity',
        inViewFeature === id
          ? 'active-card opacity-100'
          : 'pointer-events-none opacity-0'
      )}
    >
      <div
        className={clsx(
          'gradient absolute inset-0 origin-bottom-left rounded-2xl bg-gradient-to-br',
          gradient
        )}
      />
      {children}
      <button
        onClick={() => setFullscreenFeature(id)}
        className='show-me-btn absolute bottom-6 right-6 rounded-xl bg-black px-4 py-2 text-white shadow-lg'
      >
        Show me
      </button>
    </div>
  );
};

export const Production = ({ id }: CardProps) => {
  return (
    <FeatureCard id={id} gradient='from-[#f7f0ff] to-[#a78afe]'>
      <NextImage
        alt='Produktion'
        src='/images/sticky-scroll_image-production.jpg'
        layout='fill'
      />
      <span />
    </FeatureCard>
  );
};

export const Repair = ({ id }: CardProps) => {
  return (
    <FeatureCard id={id} gradient='from-[#f5fbff] to-[#addeff]'>
      <NextImage
        alt='Produktion'
        src='/images/sticky-scroll_image-repair.jpg'
        layout='fill'
      />
      <span />
    </FeatureCard>
  );
};

export const Commerce = ({ id }: CardProps) => {
  return (
    <FeatureCard id={id} gradient='from-[#f5fff7] to-[#adf8ff]'>
      <NextImage
        alt='Produktion'
        src='/images/sticky-scroll_image-commerce.jpg'
        layout='fill'
      />
      <span />
    </FeatureCard>
  );
};

export const Music = ({ id }: CardProps) => {
  const fullscreenFeature = useFeatureStore((store) => store.fullscreenFeature);
  const isFullscreen = fullscreenFeature === id;

  return (
    <FeatureCard id={id} gradient='from-[#e0e0e0] to-[#ffffff]'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={clsx(
          'absolute left-[5%] top-[10%] w-[30%] rounded-xl shadow-lg transition-transform',
          isFullscreen ? 'scale-0' : 'scale-100'
        )}
        src='/images/sticky-scroll_grid-1.jpg'
        alt='song1'
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={clsx(
          'absolute left-[70%] top-[20%] w-[35%] rounded-xl shadow-lg transition-transform',
          isFullscreen ? 'scale-0' : 'scale-100'
        )}
        src='/images/sticky-scroll_grid-2.jpg'
        alt='song2'
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={clsx(
          'absolute left-[15%] top-[50%] w-[70%] rounded-xl shadow-lg transition-transform',
          isFullscreen ? 'scale-0' : 'scale-100'
        )}
        src='/images/sticky-scroll_grid-3.jpg'
        alt='song3'
      />

      {!isFullscreen && (
        <motion.div
          layoutId='spotify-logo'
          className='bg-primary-500 absolute left-[40%] top-32 h-48 w-24 rounded-[96px] p-3 shadow-lg'
        >
          <Logo className='absolute left-[-85%] top-[35%] rotate-90 text-white' />
        </motion.div>
      )}
    </FeatureCard>
  );
};

export const SchedulingLinks = ({ id }: CardProps) => {
  return (
    <FeatureCard id={id} gradient='from-[#fff7f5] to-[#ffd8ad]'>
      <span />
    </FeatureCard>
  );
};

export const Team = ({ id }: CardProps) => {
  return (
    <FeatureCard id={id} gradient='from-[#fef5ff] to-[#ffade1]'>
      <span />
    </FeatureCard>
  );
};
