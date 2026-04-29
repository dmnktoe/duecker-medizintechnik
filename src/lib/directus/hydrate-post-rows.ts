import { readFiles, readItems } from '@directus/sdk';

import { directus } from '@/lib/directus';
import {
  authorListFields,
  categoryListFields,
  fileAssetFields,
} from '@/lib/directus/post-fields';

import type {
  Author as DirectusAuthor,
  Category as DirectusCategory,
  DirectusFile,
  Post as DirectusPost,
} from '@/types/Directus';

/**
 * Loads `categories`, `authors`, and files for post rows whose M2Os are FK ids.
 */
export async function hydratePostFkRows(
  rows: DirectusPost[],
): Promise<DirectusPost[]> {
  if (rows.length === 0) return rows;

  const categoryIds = [
    ...new Set(
      rows
        .map((r) => r.category)
        .filter((c): c is string | number => c != null && typeof c !== 'object')
        .map(String),
    ),
  ];
  const authorIds = [
    ...new Set(
      rows
        .map((r) => r.author)
        .filter((a): a is string | number => a != null && typeof a !== 'object')
        .map(String),
    ),
  ];

  const [categories, authors] = await Promise.all([
    categoryIds.length
      ? ((await directus.request(
          readItems('categories', {
            filter: { id: { _in: categoryIds as never } },
            fields: [...categoryListFields] as never,
            limit: -1,
          }),
        )) as unknown as DirectusCategory[])
      : [],
    authorIds.length
      ? ((await directus.request(
          readItems('authors', {
            filter: { id: { _in: authorIds as never } },
            fields: [...authorListFields] as never,
            limit: -1,
          }),
        )) as unknown as DirectusAuthor[])
      : [],
  ]);

  const catById = new Map(categories.map((c) => [String(c.id), c]));

  const fileIds = new Set<string>();
  for (const r of rows) {
    if (typeof r.image === 'string' && r.image) fileIds.add(r.image);
  }
  for (const a of authors) {
    if (typeof a.image === 'string' && a.image) fileIds.add(a.image);
  }

  const filesById = new Map<string, DirectusFile>();
  if (fileIds.size > 0) {
    const ids = Array.from(fileIds) as never;
    const files = (await directus.request(
      readFiles({
        filter: { id: { _in: ids } },
        fields: [...fileAssetFields] as never,
        limit: -1,
      }),
    )) as unknown as DirectusFile[];
    for (const f of files) filesById.set(f.id, f);
  }

  const authorsWithFiles = authors.map(
    (a): DirectusAuthor => ({
      ...a,
      image:
        typeof a.image === 'string' && filesById.has(a.image)
          ? filesById.get(a.image)!
          : a.image,
    }),
  );
  const authorById = new Map(authorsWithFiles.map((a) => [String(a.id), a]));

  return rows.map((r): DirectusPost => {
    const cid =
      r.category != null && typeof r.category !== 'object'
        ? String(r.category)
        : null;
    const aid =
      r.author != null && typeof r.author !== 'object'
        ? String(r.author)
        : null;

    const category =
      cid && catById.has(cid)
        ? (catById.get(cid) as DirectusCategory)
        : r.category;
    const author =
      aid && authorById.has(aid)
        ? (authorById.get(aid) as DirectusAuthor)
        : r.author;
    const image =
      typeof r.image === 'string' && filesById.has(r.image)
        ? filesById.get(r.image)!
        : r.image;

    return { ...r, category, author, image } as DirectusPost;
  });
}
