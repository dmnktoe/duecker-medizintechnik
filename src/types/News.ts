import { AuthorData } from '@/types/Author';
import { CategoryData } from '@/types/Category';
import { ImageData } from '@/types/Image';

export interface News {
  id: number;
  attributes: NewsAttributes;
}

interface NewsAttributes {
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  author: {
    data: AuthorData;
  };
  image: {
    data: ImageData;
  };
  category: {
    data: CategoryData;
  };
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
