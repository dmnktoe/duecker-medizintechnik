import { readItems } from '@directus/sdk';
import { draftMode } from 'next/headers';

import { directus } from '@/lib/directus';
import { resolveDownloadFiles } from '@/lib/directus/download-file-refs';
import { logDirectusError } from '@/lib/directus-logging';
import { getDirectusAssetUrl } from '@/lib/directus-urls';

import type {
  DirectusFile,
  Download as DirectusDownload,
  DownloadFileJunction,
} from '@/types/Directus';
import type { Download, DownloadFile } from '@/types/Download';

const DOWNLOAD_FIELDS = [
  'id',
  'status',
  'name',
  { category: ['id', 'name', 'slug'] },
  { files: ['*'] },
];

function formatBytes(size: number | string | null | undefined): string {
  if (size == null) return '';
  const value = typeof size === 'string' ? Number(size) : size;
  if (!Number.isFinite(value) || value <= 0) return '';
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / (1024 * 1024)).toFixed(2)} MB`;
}

function mimeToExtension(mime: string | null | undefined): string {
  if (!mime) return '';
  const subtype = mime.split('/')[1] ?? mime;
  if (subtype.includes('+')) return subtype.split('+')[0];
  const lower = subtype.toLowerCase();
  if (lower === 'jpeg') return 'jpg';
  return lower;
}

function extensionFromFilename(name: string | null | undefined): string {
  if (!name?.includes('.')) return '';
  const part = name.split('.').pop() ?? '';
  return /^[a-z0-9]+$/i.test(part) ? part.toLowerCase() : '';
}

function fileExtension(file: DirectusFile): string {
  const fromMime = mimeToExtension(file.type ?? '');
  if (fromMime) return fromMime;
  return extensionFromFilename(
    file.filename_download ?? file.filename_disk ?? undefined,
  );
}

function mapJunctionToFile(
  junction: DownloadFileJunction,
): DownloadFile | null {
  const file = junction.directus_files_id;
  if (!file || typeof file !== 'object') return null;
  const directusFile = file as DirectusFile;
  return {
    id: directusFile.id,
    title:
      directusFile.title ??
      directusFile.filename_download ??
      'Unbenannte Datei',
    size: formatBytes(directusFile.filesize),
    url: getDirectusAssetUrl(directusFile),
    type: fileExtension(directusFile),
  };
}

export function mapDownload(download: DirectusDownload): Download {
  const category =
    download.category && typeof download.category === 'object'
      ? {
          id: download.category.id,
          name: download.category.name,
          slug: download.category.slug ?? null,
        }
      : null;

  const files: DownloadFile[] = (download.files ?? [])
    .map((row) => mapJunctionToFile(row as unknown as DownloadFileJunction))
    .filter((f): f is DownloadFile => f !== null);

  return {
    id: download.id,
    name: download.name,
    category,
    files,
  };
}

async function isDraftEnabled(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    return false;
  }
}

export async function listDownloads(): Promise<Download[]> {
  const draft = await isDraftEnabled();
  try {
    const rows = (await directus.request(
      readItems('downloads', {
        fields: DOWNLOAD_FIELDS as never,
        sort: ['-id'],
        limit: -1,
        filter: {
          ...(draft ? {} : { status: { _eq: 'published' } }),
        },
      }),
    )) as unknown as DirectusDownload[];

    const hydrated = await resolveDownloadFiles(rows);
    return (hydrated as DirectusDownload[]).map(mapDownload);
  } catch (error) {
    logDirectusError('listDownloads', error, { draft });
    return [];
  }
}
