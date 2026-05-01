import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';

import {
  ImageBannerRole,
  responsiveImageSizes,
} from '@/constants/responsive-image-sizes';

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

const ImageBanner = ({
  alt,
  className,
  delay,
  priority,
  role,
  src,
  staticAnimation,
}: Props) => {
  return (
    <motion.figure
      whileInView={VariantNames.Animate}
      viewport={{ once: true, amount: 0.4 }}
      initial={VariantNames.Initial}
      custom={delay}
      variants={staticAnimation ? {} : imgBannerVariants}
      className={clsx(
        'relative min-h-[250px] w-full self-end overflow-hidden md:min-h-[350px]',
        className,
      )}
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
    </motion.figure>
  );
};
export default ImageBanner;
