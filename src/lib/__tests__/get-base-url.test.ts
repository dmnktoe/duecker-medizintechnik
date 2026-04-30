import { getBaseUrl } from '@/lib/get-base-url';

describe('getBaseUrl', () => {
  it('returns NEXT_PUBLIC_APP_URL if defined', () => {
    process.env.NEXT_PUBLIC_APP_URL = 'https://example.com';
    expect(getBaseUrl()).toBe('https://example.com');
    delete process.env.NEXT_PUBLIC_APP_URL;
  });

  it('returns NEXT_PUBLIC_VERCEL_URL if NEXT_PUBLIC_APP_URL is not defined', () => {
    process.env.NEXT_PUBLIC_VERCEL_URL = 'example.vercel.app';
    expect(getBaseUrl()).toBe('https://example.vercel.app');
    delete process.env.NEXT_PUBLIC_VERCEL_URL;
  });

  it('returns localhost URL in development when env URLs are not defined', () => {
    jest.replaceProperty(process, 'env', {
      ...process.env,
      NODE_ENV: 'development',
      NEXT_PUBLIC_APP_URL: undefined,
      NEXT_PUBLIC_VERCEL_URL: undefined,
    });
    expect(getBaseUrl()).toBe('http://localhost:3000');
  });

  it('returns production site URL when in production and env URLs are not defined', () => {
    jest.replaceProperty(process, 'env', {
      ...process.env,
      NODE_ENV: 'production',
      NEXT_PUBLIC_APP_URL: undefined,
      NEXT_PUBLIC_VERCEL_URL: undefined,
    });
    expect(getBaseUrl()).toBe('https://www.duecker-medizintechnik.de');
  });
});
