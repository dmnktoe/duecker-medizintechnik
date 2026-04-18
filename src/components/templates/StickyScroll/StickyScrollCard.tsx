import clsx from 'clsx';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { VscArrowRight } from 'react-icons/vsc';

import { ButtonLink } from '@/components/ui';

import { useFeatureStore } from './StickyScrollStore';

import distributionStickyImg from '/public/images/home/sticky-scroll/sticky-scroll_image-distribution.webp';
import productionStickyImg from '/public/images/home/sticky-scroll/sticky-scroll_image-production.jpg';
import repairStickyImg from '/public/images/home/sticky-scroll/sticky-scroll_image-repair.jpg';

type StickyScrollCardProps = {
  children: React.ReactNode;
} & CardProps;

type CardProps = {
  id: string;
};

const StickyScrollCard = ({ children, id }: StickyScrollCardProps) => {
  const inViewFeature = useFeatureStore((state) => state.inViewFeature);
  const t = useTranslations('home');

  return (
    <div
      className={clsx(
        'absolute inset-0 h-full w-full overflow-hidden transition-opacity',
        inViewFeature === id
          ? 'active-card opacity-100'
          : 'pointer-events-none opacity-0',
      )}
    >
      <div className={clsx('absolute inset-0 origin-bottom-left')} />
      {children}
      <ButtonLink
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        href={'/leistungen/' + t('content.stickyScroll.' + id + '.href')}
        className='absolute bottom-6 right-6 bg-white/40 px-8 py-3 font-normal tracking-normal text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/90 hover:text-dark active:bg-white/80'
      >
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error */}
        {t('content.stickyScroll.' + id + '.title')}
        <VscArrowRight className='ml-2 inline' />
      </ButtonLink>
    </div>
  );
};

export const Production = ({ id }: CardProps) => {
  return (
    <StickyScrollCard id={id}>
      <Image
        alt='Produktion'
        src={productionStickyImg}
        placeholder='blur'
        priority
        width={1000}
        height={1000}
        className='relative h-full w-full overflow-hidden'
        quality={90}
      />
      <span />
    </StickyScrollCard>
  );
};

export const Repair = ({ id }: CardProps) => {
  return (
    <StickyScrollCard id={id}>
      <Image
        alt='Produktion'
        src={repairStickyImg}
        placeholder='blur'
        priority
        width={1000}
        height={1000}
        className='relative h-full w-full overflow-hidden'
        quality={90}
      />
      <span />
    </StickyScrollCard>
  );
};

export const Distribution = ({ id }: CardProps) => {
  return (
    <StickyScrollCard id={id}>
      <Image
        alt='Produktion'
        src={distributionStickyImg}
        placeholder='blur'
        priority
        width={1000}
        height={1000}
        className='relative h-full w-full overflow-hidden'
        quality={90}
      />
      <span />
    </StickyScrollCard>
  );
};
