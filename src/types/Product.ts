import { StaticImageData } from 'next/image';

export interface Product {
  title: string;
  text: string;
  image: StaticImageData;
  manufacturer: string;
  url: string;
  manual: string;
}
