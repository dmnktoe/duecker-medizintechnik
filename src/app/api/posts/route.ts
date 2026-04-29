import { NextResponse } from 'next/server';

import { listPosts } from '@/lib/posts';

export async function GET() {
  try {
    const posts = await listPosts({ limit: 4 });
    return NextResponse.json({ data: posts });
  } catch {
    return NextResponse.json({ data: null }, { status: 502 });
  }
}
