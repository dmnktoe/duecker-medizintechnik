import { NextRequest, NextResponse } from 'next/server';

import { i18nConfig } from '@/i18n/settings';

const { locales, defaultLocale } = i18nConfig;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (pathnameHasLocale) return NextResponse.next();

  const acceptLanguage = request.headers.get('accept-language') ?? '';
  const preferredLocale =
    locales.find((locale) =>
      acceptLanguage.toLowerCase().includes(locale.toLowerCase()),
    ) ?? defaultLocale;

  const newUrl = new URL(
    `/${preferredLocale}${pathname === '/' ? '' : pathname}`,
    request.url,
  );
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ['/((?!_next|api|monitoring|favicon|images|locales|.*\\..*).*)'],
};
