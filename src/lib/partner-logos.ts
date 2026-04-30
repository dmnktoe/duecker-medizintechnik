import { readItems } from '@directus/sdk';
import { draftMode } from 'next/headers';

import { directus } from '@/lib/directus';
import { logDirectusError } from '@/lib/directus-logging';
import { getDirectusAssetUrl } from '@/lib/directus-urls';

import type { DirectusFile, PartnersItem } from '@/types/Directus';
import type { PartnerLogoItem } from '@/types/PartnerLogo';

const FILE_UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const PARTNER_LOGO_FIELDS = [
  'id',
  'status',
  'sort',
  'name',
  'link_url',
  {
    logo: [
      'id',
      'title',
      'filename_download',
      'type',
      'filename_disk',
    ],
  },
] as const;

function mapRow(row: PartnersItem): PartnerLogoItem | null {
  const file = row.logo;
  const directusFile =
    file && typeof file === 'object' ? (file as DirectusFile) : null;
  let logoUrl = '';
  let mimeType: string | null = null;
  if (directusFile) {
    logoUrl = getDirectusAssetUrl(directusFile);
    mimeType = directusFile.type ?? null;
  } else if (typeof file === 'string' && FILE_UUID_RE.test(file)) {
    logoUrl = getDirectusAssetUrl({ id: file });
  }
  if (!logoUrl) return null;

  const alt =
    (row.name && row.name.trim()) ||
    directusFile?.title?.trim() ||
    directusFile?.filename_download?.trim() ||
    'Partner logo';

  const link = row.link_url?.trim();
  return {
    id: String(row.id),
    logoUrl,
    alt,
    linkUrl: link ? link : null,
    mimeType,
  };
}

async function isDraftEnabled(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    return false;
  }
}

/**
 * Partner logos from Directus collection `partners`: home logo strip under the
 * hero and the partner marquee on `/unternehmen`.
 */
export async function listPartnerLogos(): Promise<PartnerLogoItem[]> {
  const draft = await isDraftEnabled();
  try {
    const rows = (await directus.request(
      readItems('partners', {
        fields: PARTNER_LOGO_FIELDS as never,
        sort: ['sort', 'id'],
        limit: -1,
        filter: {
          ...(draft ? {} : { status: { _eq: 'published' } }),
        },
      }),
    )) as unknown as PartnersItem[];

    return rows
      .map(mapRow)
      .filter((item): item is PartnerLogoItem => item !== null);
  } catch (error) {
    logDirectusError('listPartnerLogos', error, { draft });
    return [];
  }
}
