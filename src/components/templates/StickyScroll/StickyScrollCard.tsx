import clsx from 'clsx';
import { useTranslation } from 'next-i18next';
import { VscArrowRight } from 'react-icons/vsc';

import ButtonLink from '@/components/ui/links/ButtonLink';
import NextImage from '@/components/ui/NextImage';

import { useFeatureStore } from './store';

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
        'absolute inset-0 h-full w-full overflow-hidden rounded-2xl transition-opacity',
        inViewFeature === id
          ? 'active-card opacity-100'
          : 'pointer-events-none opacity-0',
      )}
    >
      <div
        className={clsx(
          'gradient absolute inset-0 origin-bottom-left rounded-2xl bg-gradient-to-br',
          gradient,
        )}
      />
      {children}
      <ButtonLink
        href={'/leistungen/' + t('content.stickyScroll.' + id + '.href')}
        className='show-me-btn absolute bottom-6 right-6 rounded-full bg-white/40 px-8 py-3 font-normal tracking-normal text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/90 hover:text-dark'
      >
        {t('content.stickyScroll.' + id + '.title')}
        <VscArrowRight className='ml-2 inline' />
      </ButtonLink>
    </div>
  );
};

export const Production = ({ id }: CardProps) => {
  return (
    <StickyScrollCard id={id} gradient='from-[#f7f0ff] to-[#a78afe]'>
      <NextImage
        alt='Produktion'
        src='/images/home/sticky-scroll/sticky-scroll_image-production.jpg'
        layout='fill'
      />
      <span />
    </StickyScrollCard>
  );
};

export const Repair = ({ id }: CardProps) => {
  return (
    <StickyScrollCard id={id} gradient='from-[#f5fbff] to-[#addeff]'>
      <NextImage
        alt='Produktion'
        src='/images/home/sticky-scroll/sticky-scroll_image-repair.jpg'
        layout='fill'
      />
      <span />
    </StickyScrollCard>
  );
};

export const Commerce = ({ id }: CardProps) => {
  return (
    <StickyScrollCard id={id} gradient='from-[#f5fff7] to-[#adf8ff]'>
      <NextImage
        alt='Produktion'
        src='/images/home/sticky-scroll/sticky-scroll_image-commerce.jpg'
        layout='fill'
      />
      <span />
    </StickyScrollCard>
  );
};
