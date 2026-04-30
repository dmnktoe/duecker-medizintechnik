import { getBaseUrl } from '@/lib/get-base-url';

const originalEnv = { ...process.env };

describe('getBaseUrl', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    for (const key of Object.keys(process.env)) {
      if (!(key in originalEnv)) {
        delete process.env[key as keyof NodeJS.ProcessEnv];
      }
    }
    Object.assign(process.env, originalEnv);
  });

  it('returns NEXT_PUBLIC_APP_URL if defined', () => {
    process.env.NEXT_PUBLIC_APP_URL = 'https://example.com';
    expect(getBaseUrl()).toBe('https://example.com');
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
