/** `posts`: only scalar FK columns — nested `fields` can produce invalid SQL on some Directus versions. */

export const postRowFieldList = [
  'id',
  'status',
  'date_created',
  'date_updated',
  'date_published',
  'title',
  'slug',
  'excerpt',
  'content',
  'image',
  'category',
  'author',
] as const;

export const postRowsFieldsComma = [...postRowFieldList].join(',');

export const categoryListFields = ['id', 'name', 'slug'] as const;

export const authorListFields = ['id', 'name', 'bio', 'mail', 'image'] as const;

export const fileAssetFields = [
  'id',
  'title',
  'description',
  'width',
  'height',
  'filename_download',
] as const;
