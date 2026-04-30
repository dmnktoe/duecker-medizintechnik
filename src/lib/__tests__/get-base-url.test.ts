import { getBaseUrl } from '@/lib/get-base-url';

describe('getBaseUrl', () => {
  it('returns NEXT_PUBLIC_APP_URL if defined', () => {
    process.env.NEXT_PUBLIC_APP_URL = 'https://example.com';
    expect(getBaseUrl()).toBe('https://example.com');
    delete process.env.NEXT_PUBLIC_APP_URL;
  });

  it('returns localhost URL in development when env URL is not defined', () => {
    jest.replaceProperty(process, 'env', {
      ...process.env,
      NODE_ENV: 'development',
      NEXT_PUBLIC_APP_URL: undefined,
    });
    expect(getBaseUrl()).toBe('http://localhost:3000');
  });

  it('returns production site URL when in production and env URL is not defined', () => {
    jest.replaceProperty(process, 'env', {
      ...process.env,
      NODE_ENV: 'production',
      NEXT_PUBLIC_APP_URL: undefined,
    });
    expect(getBaseUrl()).toBe('https://duecker-medizintechnik.de');
  });
});
