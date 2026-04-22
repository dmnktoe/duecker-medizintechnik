import { readItems } from '@directus/sdk';
import { draftMode } from 'next/headers';

import { directus } from '@/lib/directus';
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
  'locale',
  { category: ['id', 'name', 'slug'] },
  {
    files: [
      'id',
      {
        directus_files_id: [
          'id',
          'title',
          'filename_download',
          'type',
          'filesize',
        ],
      },
    ],
  },
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
  if (mime.includes('/')) return mime.split('/')[1];
  return mime;
}

function mapJunctionToFile(
  junction: DownloadFileJunction,
): DownloadFile | null {
  const file = junction.directus_files_id;
  if (!file || typeof file === 'string') return null;
  const directusFile = file as DirectusFile;
  return {
    id: directusFile.id,
    title:
      directusFile.title ??
      directusFile.filename_download ??
      'Unbenannte Datei',
    size: formatBytes(directusFile.filesize),
    url: getDirectusAssetUrl(directusFile),
    type: mimeToExtension(directusFile.type ?? '').toLowerCase(),
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
    .map(mapJunctionToFile)
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

export async function listDownloads(locale?: string): Promise<Download[]> {
  const draft = await isDraftEnabled();
  const items = (await directus.request(
    readItems('downloads', {
      fields: DOWNLOAD_FIELDS as never,
      sort: ['-id'],
      limit: -1,
      filter: {
        ...(draft ? {} : { status: { _eq: 'published' } }),
        ...(locale ? { locale: { _eq: locale } } : {}),
      },
    }),
  )) as unknown as DirectusDownload[];
  return items.map(mapDownload);
}
