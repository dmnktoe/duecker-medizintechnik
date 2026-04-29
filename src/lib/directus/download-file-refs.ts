import { readFiles, readItems } from '@directus/sdk';

import { directus } from '@/lib/directus';

import type { DirectusFile } from '@/types/Directus';

/** Standard Directus junction: `downloads` M2M `directus_files`. */
export const DOWNLOADS_FILES_JUNCTION = 'downloads_files' as const;

const FILE_FIELDS = [
  'id',
  'title',
  'filename_disk',
  'filename_download',
  'type',
  'filesize',
] as const;

/** Collect file UUID(s) from a nested junction row (`directus_files_id` alias may vary). */
function fileIdFromNestedRow(row: Record<string, unknown>): string | null {
  const a = row.directus_files_id;
  if (typeof a === 'string' || typeof a === 'number') return String(a);
  if (a && typeof a === 'object' && 'id' in a)
    return String((a as { id: unknown }).id);
  const b = row.files_id ?? row.directus_file;
  if (typeof b === 'string' || typeof b === 'number') return String(b);
  return null;
}

/** File ids already present on nested `downloads.files` from readItems depth. */
export function collectNestedFileIds(
  rows: Record<string, unknown>[] | null | undefined,
): string[] {
  if (!rows?.length) return [];
  const out: string[] = [];
  for (const row of rows) {
    const id = fileIdFromNestedRow(row);
    if (id) out.push(id);
  }
  return out;
}

/**
 * When `downloads.files` is missing or stores only stubs, resolve via junction table.
 */
export async function fileIdsPerDownloadViaJunction(
  downloadIds: (string | number)[],
): Promise<Map<string, string[]>> {
  const map = new Map<string, string[]>();
  if (!downloadIds.length) return map;

  try {
    const rows = (await directus.request(
      readItems(DOWNLOADS_FILES_JUNCTION as never, {
        filter: { downloads_id: { _in: [...downloadIds] as never } },
        fields: ['downloads_id', 'directus_files_id'] as never,
        limit: -1,
      }),
    )) as unknown as Array<{
      downloads_id?: string | number | null;
      directus_files_id?: unknown;
    }>;

    for (const row of rows) {
      if (row.downloads_id == null) continue;
      const k = String(row.downloads_id);
      let fid: string | null = null;
      const ref = row.directus_files_id;
      if (typeof ref === 'string' || typeof ref === 'number') fid = String(ref);
      else if (ref && typeof ref === 'object' && 'id' in ref)
        fid = String((ref as { id: unknown }).id);
      if (!fid) continue;
      const list = map.get(k) ?? [];
      list.push(fid);
      map.set(k, list);
    }
  } catch {
    // Wrong junction name — caller uses nested path only.
  }
  return map;
}

/** Batch-load `directus_files` rows by primary key. */
export async function loadDirectusFilesByIds(
  ids: Set<string>,
): Promise<Map<string, DirectusFile>> {
  if (!ids.size) return new Map();
  const rows = (await directus.request(
    readFiles({
      filter: { id: { _in: [...ids] as never } },
      fields: [...FILE_FIELDS] as never,
      limit: -1,
    }),
  )) as unknown as DirectusFile[];
  return new Map(rows.map((f) => [f.id, f]));
}

/**
 * Normalize each download row so `files[].directus_files_id` is resolved to a file object when possible.
 */
export async function resolveDownloadFiles(
  downloads: Array<{
    id: string | number;
    files?: Array<Record<string, unknown>> | null;
  }>,
): Promise<
  Array<{
    id: string | number;
    files?: Array<Record<string, unknown>> | null;
  }>
> {
  const dlIds = downloads.map((d) => d.id);

  const allFileIds = new Set<string>();
  for (const d of downloads) {
    collectNestedFileIds(d.files).forEach((id) => allFileIds.add(id));
  }

  const junctionMap = await fileIdsPerDownloadViaJunction(dlIds);
  for (const d of downloads) {
    const k = String(d.id);
    if (!collectNestedFileIds(d.files).length && junctionMap.has(k)) {
      junctionMap.get(k)?.forEach((id) => allFileIds.add(id));
    }
  }

  const fileById = await loadDirectusFilesByIds(allFileIds);

  return downloads.map(
    (
      d,
    ): {
      id: string | number;
      files?: Array<Record<string, unknown>> | null;
    } => {
      const k = String(d.id);
      let rows = [...(d.files ?? [])];

      if (!collectNestedFileIds(rows).length && junctionMap.has(k)) {
        rows = junctionMap.get(k)!.map((fid, i) => ({
          id: `junction-${k}-${i}`,
          downloads_id: d.id,
          directus_files_id: fileById.get(fid)?.id ?? fid,
        }));
      }

      rows = rows.map((row): Record<string, unknown> => {
        const fid = fileIdFromNestedRow(row as Record<string, unknown>);
        if (fid && fileById.has(fid)) {
          return { ...row, directus_files_id: fileById.get(fid)! };
        }
        return row as Record<string, unknown>;
      });

      return { ...d, files: rows };
    },
  );
}
