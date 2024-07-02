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
    <div className='flex flex-col items-start justify-around bg-gray-100 p-6'>
      <div className='flex w-full grow flex-col'>
        <AspectRatio ratio={4 / 3} className='mb-6 w-full'>
          <Image
            src={image}
            placeholder='blur'
            priority
            alt={title}
            fill
            className='w-full object-cover object-center'
          />
        </AspectRatio>
        <Body size='sm' margin={false} isStrong className='underline'>
          {manufacturer}
        </Body>
        <Title size='four'>{title}</Title>
        <Body size='sm'>{description}</Body>
      </div>
      <ButtonLink
        variant='light'
        size='sm'
        href={url}
        className='mt-2 hover:bg-white hover:underline'
        rightIcon={VscChevronRight}
      >
        Produkt-Details
      </ButtonLink>
    </div>
  );
};
