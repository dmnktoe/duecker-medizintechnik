import { readItems } from '@directus/sdk';
import { draftMode } from 'next/headers';

import { directus } from '@/lib/directus';
import { logDirectusError } from '@/lib/directus-logging';
import { getDirectusAssetUrl } from '@/lib/directus-urls';

import type { DirectusFile, HomePartnerLogo } from '@/types/Directus';
import type { HomePartnerLogoItem } from '@/types/HomePartnerLogo';

const FILE_UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const HOME_PARTNER_LOGO_FIELDS = [
  'id',
  'status',
  'sort',
  'name',
  'link_url',
  'use_in_slider',
  'use_in_logo_strip',
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

function normalizeBool(v: boolean | null | undefined, defaultTrue: boolean) {
  if (v === null || v === undefined) return defaultTrue;
  return v;
}

function mapRow(row: HomePartnerLogo): HomePartnerLogoItem | null {
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
    useInSlider: normalizeBool(row.use_in_slider, true),
    useInLogoStrip: normalizeBool(row.use_in_logo_strip, true),
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
 * Loads home hero partner logos from Directus (`home_partner_logos`).
 * Same rows can power the hero slider and the logo strip via per-item flags.
 */
export async function listHomePartnerLogos(): Promise<HomePartnerLogoItem[]> {
  const draft = await isDraftEnabled();
  try {
    const rows = (await directus.request(
      readItems('home_partner_logos', {
        fields: HOME_PARTNER_LOGO_FIELDS as never,
        sort: ['sort', 'id'],
        limit: -1,
        filter: {
          ...(draft ? {} : { status: { _eq: 'published' } }),
        },
      }),
    )) as unknown as HomePartnerLogo[];

    return rows
      .map(mapRow)
      .filter((item): item is HomePartnerLogoItem => item !== null);
  } catch (error) {
    logDirectusError('listHomePartnerLogos', error, { draft });
    return [];
  }
}
