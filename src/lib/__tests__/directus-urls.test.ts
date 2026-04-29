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

  it('prepends the Directus URL to relative paths', () => {
    expect(getDirectusAssetUrl('/assets/abc.jpg')).toBe(
      'https://cms.duecker-medizintechnik.de/assets/abc.jpg',
    );
  });

  it('builds an asset URL from a bare file id', () => {
    expect(getDirectusAssetUrl('abc-123')).toBe(
      'https://cms.duecker-medizintechnik.de/assets/abc-123',
    );
  });

  it('builds an asset URL from a Directus file object', () => {
    expect(getDirectusAssetUrl({ id: 'abc-123' })).toBe(
      'https://cms.duecker-medizintechnik.de/assets/abc-123',
    );
  });

  it('uses the file url when present', () => {
    expect(
      getDirectusAssetUrl({
        id: 'abc-123',
        url: '/assets/abc-123/thumb',
      }),
    ).toBe('https://cms.duecker-medizintechnik.de/assets/abc-123/thumb');
  });
});
