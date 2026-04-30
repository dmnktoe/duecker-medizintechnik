import { formatFields } from '@directus/sdk';

export const postReadFieldTrees = [
  'id',
  'status',
  'date_created',
  'date_updated',
  'date_published',
  'title',
  'slug',
  'excerpt',
  'content',
  { image: ['id', 'title', 'description', 'width', 'height'] },
  { category: ['id', 'name', 'slug'] },
  {
    author: [
      'id',
      'name',
      'bio',
      'mail',
      { image: ['id', 'title', 'description', 'width', 'height'] },
    ],
  },
] as const;

export const postReadFieldsComma = formatFields([...postReadFieldTrees]).join(
  ',',
);
