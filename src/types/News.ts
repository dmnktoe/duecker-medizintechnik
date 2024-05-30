import { Image } from '@/types/Image';

export interface News {
  id: number;
  attributes: NewsAttributes;
}

interface NewsAttributes {
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  image: Image;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface Meta {
  pagination: Pagination;
}

export interface RootObject {
  data: News[];
  meta: Meta;
}
