jest.mock('@/constant/env', () => ({
  directusUrl: 'https://cms.duecker-medizintechnik.de',
}));

jest.mock('@/lib/get-base-url', () => ({
  getBaseUrl: () => 'http://localhost:3000',
}));

import { getDirectusAssetUrl, getDirectusURL } from '@/lib/directus-urls';

describe('getDirectusURL', () => {
  it('appends the path to the configured base URL', () => {
    expect(getDirectusURL('/items/posts')).toBe(
      'https://cms.duecker-medizintechnik.de/items/posts',
    );
  });
});

describe('getDirectusAssetUrl', () => {
  it('returns an empty string for null/undefined input', () => {
    expect(getDirectusAssetUrl(null)).toBe('');
    expect(getDirectusAssetUrl(undefined)).toBe('');
  });

  it('returns external URLs unchanged', () => {
    const url = 'https://external-provider.com/media.jpg';
    expect(getDirectusAssetUrl(url)).toBe(url);
  });

  it('returns absolute app proxy URLs for CMS assets', () => {
    expect(getDirectusAssetUrl('/assets/abc.jpg')).toBe(
      'http://localhost:3000/api/cms/assets/abc.jpg',
    );
  });

  it('builds proxy URLs from bare file id', () => {
    expect(getDirectusAssetUrl('abc-123')).toBe(
      'http://localhost:3000/api/cms/assets/abc-123',
    );
  });

  it('maps file id objects to proxied URLs', () => {
    expect(getDirectusAssetUrl({ id: 'abc-123' })).toBe(
      'http://localhost:3000/api/cms/assets/abc-123',
    );
  });

  it('proxies nested asset paths under /assets/', () => {
    expect(
      getDirectusAssetUrl({
        id: 'abc-123',
        url: '/assets/abc-123/thumb',
      }),
    ).toBe('http://localhost:3000/api/cms/assets/abc-123/thumb');
  });
});
