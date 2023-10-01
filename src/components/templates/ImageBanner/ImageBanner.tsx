import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';

import {
  ImageBannerRole,
  responsiveImageSizes,
} from '@/constant/responsiveImageSizes';
import { VariantNames } from '@/interfaces/VariantNames';

import { imgBannerVariants } from './variants';

type Props = {
  src: StaticImageData;
  role: ImageBannerRole;
  delay?: number;
  blurDataURL?: string;
  className?: string;
  priority?: boolean;
  staticAnimation?: boolean;
};

const ImageBanner = ({
  src,
  role,
  className,
  priority,
  staticAnimation,
  blurDataURL,
  delay,
}: Props) => {
  return (
    <motion.div
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
        fetchPriority='high'
        quality={95}
        priority={priority}
        alt='hero'
        placeholder='blur'
        blurDataURL={blurDataURL}
        className='object-cover'
      />
    </motion.div>
  );
};
export default ImageBanner;
