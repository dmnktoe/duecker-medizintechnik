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

  it('returns localhost URL if neither NEXT_PUBLIC_APP_URL nor NEXT_PUBLIC_VERCEL_URL are defined', () => {
    expect(getBaseUrl()).toBe('http://localhost:3000');
  });
});
