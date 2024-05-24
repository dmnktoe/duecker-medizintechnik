export interface Attribute {
  url: string;
  width: number;
  height: number;
  name: string;
}

export interface Image {
  data: News;
}

export interface Attribute {
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

export interface News {
  id: number;
  attributes: Attribute;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Meta {
  pagination: Pagination;
}

export interface RootObject {
  data: News[];
  meta: Meta;
}
