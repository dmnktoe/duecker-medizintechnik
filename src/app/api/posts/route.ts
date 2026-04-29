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
      const body: Record<string, unknown> = {
        data: [],
        error: outcome.error,
      };
      if (process.env.NODE_ENV === 'development') {
        body._debug = {
          hint: 'Directus request failed; see server console for full log.',
          includeAllStatuses: includeAll,
        };
      }
      return NextResponse.json(body, { status: 502 });
    }

    const body: Record<string, unknown> = { data: outcome.posts };
    if (process.env.NODE_ENV === 'development') {
      body._debug = {
        count: outcome.posts.length,
        includeAllStatuses: includeAll,
        ...(outcome.posts.length === 0 && !includeAll
          ? {
              tip: 'No rows returned with status=published. Use ?all=1 to include drafts, or open /api/cms/diagnostics.',
            }
          : {}),
      };
    }
    return NextResponse.json(body);
  } catch {
    return NextResponse.json({ data: null }, { status: 502 });
  }
}
