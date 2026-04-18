'use client';

import clsx from 'clsx';
import { useInView } from 'framer-motion';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { VscArrowRight } from 'react-icons/vsc';

import { UnstyledLink } from '@/components/ui';

import { useFeatureStore } from './StickyScrollStore';

type StickyScrollItemProps = {
  children: React.ReactNode;
  id: string;
  index: number;
  total: number;
  href: string;
  title: string;
  learnMore: string;
};

export const StickyScrollItem = ({
  children,
  id,
  index,
  total,
  href,
  title,
  learnMore,
}: StickyScrollItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: '-40% 0px -40% 0px' });
  const setInViewFeature = useFeatureStore((state) => state.setInViewFeature);

  useEffect(() => {
    if (isInView) {
      setInViewFeature(id);
    } else if (useFeatureStore.getState().inViewFeature === id) {
      setInViewFeature(null);
    }
  }, [isInView, id, setInViewFeature]);

  return (
    <div
      ref={ref}
      className={clsx(
        'flex min-h-[55vh] flex-col justify-center border-t py-12 transition-colors duration-300',
        isInView ? 'border-gray-300' : 'border-gray-200',
      )}
    >
      <span
        className={clsx(
          'mb-3 font-secondary text-xs font-medium uppercase tracking-widest transition-colors duration-300',
          isInView ? 'text-primary-500' : 'text-gray-300',
        )}
      >
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>

      <h3
        className={clsx(
          'mb-4 text-3xl font-medium tracking-tight transition-colors duration-300 xl:text-4xl',
          isInView ? 'text-dark' : 'text-gray-300',
        )}
      >
        {title}
      </h3>

      <p
        className={clsx(
          'mb-7 max-w-lg text-base leading-relaxed transition-all duration-500',
          isInView ? 'text-gray-600 opacity-100' : 'text-gray-400 opacity-40',
        )}
      >
        {children}
      </p>

      <UnstyledLink
        href={href}
        className={clsx(
          'inline-flex w-fit items-center gap-2 border-b border-current pb-0.5 text-sm font-medium transition-all duration-300',
          isInView
            ? 'text-dark opacity-100'
            : 'pointer-events-none text-gray-300 opacity-0',
        )}
      >
        {learnMore}
        <VscArrowRight className='transition-transform duration-200 group-hover:translate-x-1' />
      </UnstyledLink>
    </div>
  );
};
