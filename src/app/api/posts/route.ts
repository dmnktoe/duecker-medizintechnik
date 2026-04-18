import { NextResponse } from 'next/server';

import { fetchAPI } from '@/lib/fetch-api';

import { News } from '@/types/News';

export async function GET() {
  try {
    const result = await fetchAPI<{ data: News[] }>(
      '/posts?sort=id:desc&populate=*&pagination[pageSize]=4',
    );
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ data: null }, { status: 502 });
  }
}
