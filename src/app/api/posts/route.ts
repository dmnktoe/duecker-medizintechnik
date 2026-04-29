import { NextRequest, NextResponse } from 'next/server';

import { listPosts } from '@/lib/posts';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const includeAll =
    searchParams.get('all') === '1' || searchParams.get('all') === 'true';

  try {
    const outcome = await listPosts({
      limit: 4,
      includeAllStatuses: includeAll,
      withOutcome: true,
    });

    if (!outcome.ok) {
      return NextResponse.json(
        { data: [], error: outcome.error },
        { status: 502 },
      );
    }

    return NextResponse.json({ data: outcome.posts });
  } catch {
    return NextResponse.json({ data: null }, { status: 502 });
  }
}
