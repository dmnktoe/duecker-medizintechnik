import { NextResponse } from 'next/server';

import { listDownloads } from '@/lib/downloads';

/**
 * Mirrors the old Strapi `GET /api/downloads` envelope for tooling and previews.
 */
export async function GET() {
  try {
    const downloads = await listDownloads();
    return NextResponse.json({ data: downloads });
  } catch {
    return NextResponse.json({ data: null }, { status: 502 });
  }
}
