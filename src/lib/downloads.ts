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

const FILE_UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const DOWNLOAD_FIELDS = [
  'id',
  'status',
  'name',
  {
    file: [
      'id',
      'title',
      'filename_disk',
      'filename_download',
      'type',
      'filesize',
    ],
  },
  { category: ['id', 'name', 'slug'] },
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

function rowToFrontendFile(df: DirectusFile): DownloadFile {
  return {
    id: df.id,
    title: df.title ?? df.filename_download ?? 'Unbenannte Datei',
    size: formatBytes(df.filesize),
    url: getDirectusAssetUrl(df),
    type: fileExtension(df),
  };
}

/**
 * Directus linked `file` as bare UUID — metadata unreadable (permissions) still
 * needs a downloadable row (asset proxy resolves by id).
 */
function rowToFrontendFileFromBareId(fileId: string): DownloadFile {
  return {
    id: fileId,
    title: 'Download',
    size: '',
    url: getDirectusAssetUrl({ id: fileId }),
    type: '',
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

  let files: DownloadFile[] = [];

  const fileRef = download.file;
  if (fileRef && typeof fileRef === 'object') {
    files = [rowToFrontendFile(fileRef as DirectusFile)];
  } else if (typeof fileRef === 'string' && FILE_UUID_RE.test(fileRef)) {
    files = [rowToFrontendFileFromBareId(fileRef)];
  } else if (download.files?.length) {
    files = (download.files as DownloadFileJunction[])
      .map((row) => {
        const ref = row.directus_files_id;
        if (typeof ref === 'object' && ref !== null) {
          return rowToFrontendFile(ref as DirectusFile);
        }
        const sid =
          typeof ref === 'string' || typeof ref === 'number' ? String(ref) : '';
        return sid && FILE_UUID_RE.test(sid)
          ? rowToFrontendFileFromBareId(sid)
          : null;
      })
      .filter((f): f is DownloadFile => f !== null);
  }

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

    const hydrated = await resolveDownloadFiles(rows as unknown[]);
    return (hydrated as DirectusDownload[]).map(mapDownload);
  } catch (error) {
    logDirectusError('listDownloads', error, { draft });
    return [];
  }
}
