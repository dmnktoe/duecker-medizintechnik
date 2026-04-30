import { readFile, readFiles, readItems } from '@directus/sdk';

import { directus } from '@/lib/directus';

import type { DirectusFile } from '@/types/Directus';

/** Fallback if junction name differs — override via env later if needed */
export const DOWNLOADS_FILES_JUNCTION = 'downloads_files' as const;

const FILE_FIELDS = [
  'id',
  'title',
  'filename_disk',
  'filename_download',
  'type',
  'filesize',
] as const;

/** Resolves a file id from a junction or nested row. */
function fileIdFromNestedRow(row: Record<string, unknown>): string | null {
  const a = row.directus_files_id;
  if (typeof a === 'string' || typeof a === 'number') return String(a);
  if (a && typeof a === 'object' && 'id' in a)
    return String((a as { id: unknown }).id);
  const b = row.files_id ?? row.directus_file;
  if (typeof b === 'string' || typeof b === 'number') return String(b);
  return null;
}

/** Collects file ids from `downloads.files[]` junction rows. */
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

/** Resolves `downloads_files` → file id lists per download id. */
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
    // Junction missing or renamed
  }
  return map;
}

/**
 * Loads file metadata by id. Uses `readFiles` when possible; if some ids are missing
 * (batch permission quirks, empty filter result), falls back to per-id `readFile`.
 */
async function loadDirectusFilesByIds(
  ids: Set<string>,
): Promise<Map<string, DirectusFile>> {
  const unique = [...ids].filter(Boolean);
  if (!unique.length) return new Map();
  const map = new Map<string, DirectusFile>();

  try {
    const rows = (await directus.request(
      readFiles({
        filter: { id: { _in: unique as never } },
        fields: [...FILE_FIELDS] as never,
        limit: -1,
      }),
    )) as unknown as DirectusFile[];
    for (const f of rows) map.set(f.id, f);
  } catch {
    // Continue with per-file fetch
  }

  const missing = unique.filter((id) => !map.has(id));
  await Promise.all(
    missing.map(async (id) => {
      try {
        const row = (await directus.request(
          readFile(id, { fields: [...FILE_FIELDS] as never }),
        )) as unknown as DirectusFile;
        if (row?.id) map.set(row.id, row);
      } catch {
        /* token may lack read_files for this id */
      }
    }),
  );

  return map;
}

/**
 * Hydrates `file` and `files` on download rows: loads full file records
 * when the API only returns a UUID, and builds junction row shapes when
 * the explicit `files` array is empty.
 */
export async function resolveDownloadFiles(
  rows: unknown[],
): Promise<unknown[]> {
  const downloads = rows as Array<{
    id: string | number;
    file?: DirectusFile | string | number | null;
    files?: Array<Record<string, unknown>> | null;
  }>;

  const idsAll = new Set<string>();

  for (const d of downloads) {
    const f = d.file;
    if (typeof f === 'string' || (typeof f === 'number' && !Number.isNaN(f))) {
      idsAll.add(String(f));
    }
    collectNestedFileIds(d.files).forEach((id) => idsAll.add(id));
  }

  const junctionMap = await fileIdsPerDownloadViaJunction(
    downloads.map((d) => d.id),
  );
  for (const d of downloads) {
    const k = String(d.id);
    if (!collectNestedFileIds(d.files ?? []).length && junctionMap.has(k)) {
      junctionMap.get(k)?.forEach((id) => idsAll.add(id));
    }
  }

  const byId = await loadDirectusFilesByIds(idsAll);

  return downloads.map((d): unknown => {
    const k = String(d.id);
    const patch: {
      file?: DirectusFile;
      files?: Array<Record<string, unknown>>;
    } = {};

    if (typeof d.file === 'string' || typeof d.file === 'number') {
      const fk = String(d.file);
      if (byId.has(fk)) patch.file = byId.get(fk)!;
    }

    let fileRows = [...(d.files ?? [])];
    if (!collectNestedFileIds(fileRows).length && junctionMap.has(k)) {
      fileRows = junctionMap.get(k)!.map((fid, i) => ({
        id: `junction-${k}-${i}`,
        downloads_id: d.id,
        directus_files_id: byId.get(fid)?.id ?? fid,
      }));
    }

    patch.files = fileRows.map((row): Record<string, unknown> => {
      const fid = fileIdFromNestedRow(row as Record<string, unknown>);
      if (fid && byId.has(fid)) {
        return { ...(row as object), directus_files_id: byId.get(fid)! };
      }
      return row as Record<string, unknown>;
    });

    return { ...d, ...patch };
  });
}
