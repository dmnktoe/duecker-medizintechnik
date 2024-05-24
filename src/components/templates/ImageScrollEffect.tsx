import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import clsxm from '@/lib/clsxm';

import { Title } from '@/components/ui/Typography';

type ImageScrollEffectProps = {
  image: string;
  text: string;
};

export default function ImageScrollEffect({
  image,
  text,
}: ImageScrollEffectProps) {
  const [scrollY, setScrollY] = useState(0);
  const controls = useAnimation();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false });

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start({ x: -1500 - -scrollY });
    }
  }, [scrollY, controls, inView]);

  return (
    <div className='relative h-screen w-full overflow-hidden' ref={ref}>
      <motion.div
        className={clsxm('absolute bottom-5 whitespace-nowrap')}
        animate={controls}
      >
        <Title className='font-secondary text-white xl:text-[10rem]'>
          {text}
        </Title>
      </motion.div>
      <Image
        src={image}
        alt='Full Width'
        className='h-full w-full object-cover'
      />
      <div className='h-[200vh]'></div>{' '}
      {/* This is to create a scrollable page */}
    </div>
  );
}
