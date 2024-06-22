type CategoryAttributes = {
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type CategoryData = {
  id: number;
  attributes: CategoryAttributes;
};
