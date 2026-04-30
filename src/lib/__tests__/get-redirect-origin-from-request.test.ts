import type { NextRequest } from 'next/server';

import { getRedirectOriginFromRequest } from '@/lib/get-base-url';

const originalEnv = { ...process.env };

function mockRequest(headers: Record<string, string>): NextRequest {
  return {
    headers: {
      get(name: string) {
        const v = headers[name.toLowerCase()];
        return v === undefined ? null : v;
      },
    },
  } as NextRequest;
}

describe('getRedirectOriginFromRequest', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    for (const key of Object.keys(process.env)) {
      if (!(key in originalEnv)) {
        delete process.env[key as keyof NodeJS.ProcessEnv];
      }
    }
    Object.assign(process.env, originalEnv);
  });

  it('uses NEXT_PUBLIC_APP_URL when set', () => {
    process.env.NEXT_PUBLIC_APP_URL = 'https://duecker-medizintechnik.de/';
    const req = mockRequest({
      'x-forwarded-host': 'localhost:3000',
      'x-forwarded-proto': 'https',
    });
    expect(getRedirectOriginFromRequest(req)).toBe(
      'https://duecker-medizintechnik.de',
    );
  });

  it('uses x-forwarded-host and x-forwarded-proto when env URL is unset', () => {
    process.env.NEXT_PUBLIC_APP_URL = '';
    delete process.env.NEXT_PUBLIC_APP_URL;

    const req = mockRequest({
      'x-forwarded-host': 'duecker-medizintechnik.de',
      'x-forwarded-proto': 'https',
    });
    expect(getRedirectOriginFromRequest(req)).toBe(
      'https://duecker-medizintechnik.de',
    );
  });

  it('defaults forwarded proto to https when missing', () => {
    process.env.NEXT_PUBLIC_APP_URL = '';
    delete process.env.NEXT_PUBLIC_APP_URL;

    const req = mockRequest({
      'x-forwarded-host': 'example.com',
    });
    expect(getRedirectOriginFromRequest(req)).toBe('https://example.com');
  });

  it('falls back to getBaseUrl when no forwarded host', () => {
    process.env.NEXT_PUBLIC_APP_URL = '';
    delete process.env.NEXT_PUBLIC_APP_URL;
    jest.replaceProperty(process, 'env', {
      ...process.env,
      NODE_ENV: 'development',
      NEXT_PUBLIC_APP_URL: undefined,
    });
    const req = mockRequest({});
    expect(getRedirectOriginFromRequest(req)).toBe('http://localhost:3000');
  });
});
