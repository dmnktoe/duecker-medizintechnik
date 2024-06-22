import { ImageData } from '@/types/Image';

type AuthorAttributes = {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  bio?: string;
  mail?: string;
  image: {
    data: ImageData | undefined;
  };
};

export type AuthorData = {
  id: number;
  attributes: AuthorAttributes;
};
