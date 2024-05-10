import clsx from 'clsx';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import * as React from 'react';
import { VscArrowRight } from 'react-icons/vsc';

import ButtonLink from '@/components/ui/Links/ButtonLink';

import { useFeatureStore } from './store';

import commerceStickyImg from '/public/images/home/sticky-scroll/sticky-scroll_image-commerce.jpg';
import productionStickyImg from '/public/images/home/sticky-scroll/sticky-scroll_image-production.jpg';
import repairStickyImg from '/public/images/home/sticky-scroll/sticky-scroll_image-repair.jpg';

type StickyScrollCardProps = {
  gradient: string;
  children: React.ReactNode;
} & CardProps;

type CardProps = {
  id: string;
};

const StickyScrollCard = ({
  gradient,
  children,
  id,
}: StickyScrollCardProps) => {
  const inViewFeature = useFeatureStore((state) => state.inViewFeature);
  const { t } = useTranslation('home');

  return (
    <div
      className={clsx(
        'absolute inset-0 h-full w-full overflow-hidden transition-opacity',
        inViewFeature === id
          ? 'active-card opacity-100'
          : 'pointer-events-none opacity-0',
      )}
    >
      <div
        className={clsx(
          'gradient absolute inset-0 origin-bottom-left bg-gradient-to-br',
          gradient,
        )}
      />
      {children}
      <ButtonLink
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        href={'/leistungen/' + t('content.stickyScroll.' + id + '.href')}
        className='absolute bottom-6 right-6 rounded-full bg-white/40 px-8 py-3 font-normal tracking-normal text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/90 hover:text-dark active:bg-white/80'
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
    <StickyScrollCard id={id} gradient='from-[#f7f0ff] to-[#a78afe]'>
      <Image
        alt='Produktion'
        src={productionStickyImg}
        placeholder='blur'
        priority
        width={600}
        height={600}
        className='relative h-full w-full overflow-hidden'
        quality={65}
      />
      <span />
    </StickyScrollCard>
  );
};

export const Repair = ({ id }: CardProps) => {
  return (
    <StickyScrollCard id={id} gradient='from-[#f5fbff] to-[#addeff]'>
      <Image
        alt='Produktion'
        src={repairStickyImg}
        placeholder='blur'
        priority
        width={600}
        height={600}
        className='relative h-full w-full overflow-hidden'
        quality={65}
      />
      <span />
    </StickyScrollCard>
  );
};

export const Commerce = ({ id }: CardProps) => {
  return (
    <StickyScrollCard id={id} gradient='from-[#f5fff7] to-[#adf8ff]'>
      <Image
        alt='Produktion'
        src={commerceStickyImg}
        placeholder='blur'
        priority
        width={600}
        height={600}
        className='relative h-full w-full overflow-hidden'
        quality={65}
      />
      <span />
    </StickyScrollCard>
  );
};
