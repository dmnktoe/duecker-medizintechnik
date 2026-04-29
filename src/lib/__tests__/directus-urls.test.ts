jest.mock('@/constant/env', () => ({
  directusUrl: 'https://cms.duecker-medizintechnik.de',
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

  it('returns a same-origin proxy path for Directus asset paths', () => {
    expect(getDirectusAssetUrl('/assets/abc.jpg')).toBe(
      '/api/cms/assets/abc.jpg',
    );
  });

  it('builds a proxy path from a bare file id', () => {
    expect(getDirectusAssetUrl('abc-123')).toBe('/api/cms/assets/abc-123');
  });

  it('builds a proxy path from a Directus file object', () => {
    expect(getDirectusAssetUrl({ id: 'abc-123' })).toBe(
      '/api/cms/assets/abc-123',
    );
  });

  it('proxies when file object has a relative asset url', () => {
    expect(
      getDirectusAssetUrl({
        id: 'abc-123',
        url: '/assets/abc-123/thumb',
      }),
    ).toBe('/api/cms/assets/abc-123/thumb');
  });
});
