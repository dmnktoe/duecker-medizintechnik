import clsx from 'clsx';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import { useRef } from 'react';

import {
  ImageBannerRole,
  responsiveImageSizes,
} from '@/constant/responsive-image-sizes';

import { imgBannerVariants } from './variants';

import { VariantNames } from '@/types/VariantNames';

type Props = {
  alt: string;
  className?: string;
  delay?: number;
  priority?: boolean;
  role: ImageBannerRole;
  src: StaticImageData;
  staticAnimation?: boolean;
};

const imageParallaxY = '14%';
const imageParallaxScale = 1.1;

const ImageBanner = ({
  alt,
  className,
  delay,
  priority,
  role,
  src,
  staticAnimation,
}: Props) => {
  const figureRef = useRef<HTMLFigureElement | null>(null);
  const shouldReduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: figureRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [imageParallaxY, `-${imageParallaxY}`],
  );

  return (
    <motion.figure
      ref={figureRef}
      whileInView={VariantNames.Animate}
      viewport={{ once: true, amount: 0.4 }}
      initial={VariantNames.Initial}
      custom={delay}
      variants={staticAnimation ? {} : imgBannerVariants}
      className={clsx(
        'relative z-0 min-h-[250px] w-full self-end overflow-hidden md:min-h-[350px]',
        className,
      )}
    >
      <motion.div
        aria-hidden
        className='absolute inset-0 -top-[5%] -bottom-[5%]'
        style={
          shouldReduce
            ? undefined
            : {
                y: parallaxY,
                scale: imageParallaxScale,
              }
        }
      >
        <Image
          src={src}
          sizes={responsiveImageSizes[role]}
          fill
          quality={90}
          priority={priority}
          alt={alt}
          className='object-cover'
        />
      </motion.div>
    </motion.figure>
  );
};
export default ImageBanner;
