import clsx from 'clsx';
import { useInView } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

import { useFeatureStore } from './StickyScrollStore';

type StickyScrollTitleProps = {
  children: React.ReactNode;
  id: string;
};

export const StickyScrollTitle = ({ children, id }: StickyScrollTitleProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, {
    margin: '-50% 0px -50% 0px',
  });
  const setInViewFeature = useFeatureStore((state) => state.setInViewFeature);

  useEffect(() => {
    if (isInView) {
      setInViewFeature(id);
    } else if (useFeatureStore.getState().inViewFeature === id) {
      setInViewFeature(null);
    }
  }, [isInView, id, setInViewFeature]);

  return (
    <h2
      ref={ref}
      className={clsx(
        'feature-title py-20 text-4xl font-medium tracking-tight transition-colors md:text-5xl md:leading-[1.1] xl:py-32 2xl:text-6xl 2xl:leading-[1.2]',
        isInView ? 'text-dark' : 'text-gray-300',
      )}
    >
      {children}
    </h2>
  );
};
