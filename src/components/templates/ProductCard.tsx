import Image, { StaticImageData } from 'next/image';
import { VscChevronRight } from 'react-icons/vsc';

import { AspectRatio, Body, ButtonLink, Title } from '@/components/ui';

export const ProductCard = ({
  manufacturer,
  title,
  description,
  image,
  url,
}: {
  manufacturer: string;
  title: string;
  description: string;
  image: StaticImageData;
  url: string;
}) => {
  return (
    <div className='flex flex-col items-start justify-around bg-gray-100 p-4'>
      <div className='grow'>
        <AspectRatio ratio={4 / 3} className='mb-6'>
          <Image
            src={image}
            placeholder='blur'
            priority
            alt={title}
            fill
            className='object-cover object-center'
          />
        </AspectRatio>
        <Body margin={false} isStrong>
          {manufacturer}
        </Body>
        <Title size='three'>{title}</Title>
        <Body size='sm'>{description}</Body>
      </div>
      <ButtonLink
        variant='light'
        size='sm'
        href={url}
        className='mt-2 bg-[#e5465f] text-white transition-colors ease-in-out hover:bg-[#d13f4e] hover:text-white active:bg-[#d13f4e] active:text-white'
        rightIcon={VscChevronRight}
      >
        Produkt-Details
      </ButtonLink>
    </div>
  );
};
