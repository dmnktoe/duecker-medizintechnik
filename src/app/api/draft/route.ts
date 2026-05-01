import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { getRedirectOriginFromRequest } from '@/lib/get-base-url';
import { getPostById } from '@/lib/posts';

import { directusPreviewSecret } from '@/constants/env';

/**
 * Live Preview entry point.
 *
 * Configure the Preview URL in Directus' Data Studio (Settings → Data Model →
 * Posts → Preview URL) like:
 *   `${SITE}/api/draft?secret=MY_SECRET&type=posts&id=ID`
 *
 * For collections that don't expose individual pages we fall back to the URL
 * passed via the `redirect` query parameter, so that the editor can pre-fill
 * any deep link.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const type = searchParams.get('type') ?? 'posts';
  const id = searchParams.get('id');
  const explicitRedirect = searchParams.get('redirect');
  const locale = searchParams.get('locale') ?? 'de';

  if (!directusPreviewSecret) {
    return new Response(
      'Live Preview is not configured – set DIRECTUS_PREVIEW_SECRET',
      { status: 500 },
    );
  }

  if (!secret || secret !== directusPreviewSecret) {
    return new Response('Invalid token', { status: 401 });
  }

  let target = explicitRedirect;
  if (!target) {
    if (type === 'posts' && id) {
      const post = await getPostById(id);
      if (!post) {
        return new Response('Post not found', { status: 404 });
      }
      target = `/${locale}/newsroom/${post.slug}`;
    } else if (type === 'downloads') {
      target = `/${locale}/downloads`;
    } else {
      target = `/${locale}`;
    }
  }

  const draft = await draftMode();
  draft.enable();

  const origin = getRedirectOriginFromRequest(request);
  return NextResponse.redirect(new URL(target, origin));
}
