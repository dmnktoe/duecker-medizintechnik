import clsx from 'clsx';
import { useInView } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

import { useFeatureStore } from './store';

type Props = {
  children: React.ReactNode;
  id: string;
};

export const FeatureTitle = ({ children, id }: Props) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, {
    margin: '-50% 0px -50% 0px',
  });
  const setInViewFeature = useFeatureStore((state) => state.setInViewFeature);
  const inViewFeature = useFeatureStore((state) => state.inViewFeature);

  useEffect(() => {
    if (isInView) setInViewFeature(id);
    if (!isInView && inViewFeature === id) setInViewFeature(null);
  }, [isInView, id, setInViewFeature, inViewFeature]);

  return (
    <h2
      ref={ref}
      className={clsx(
        'feature-title py-20 text-4xl font-bold tracking-tight transition-colors md:text-5xl xl:py-32 xl:leading-[1.1]',
        isInView ? 'text-dark' : 'text-gray-300'
      )}
    >
      {children}
    </h2>
  );
};
