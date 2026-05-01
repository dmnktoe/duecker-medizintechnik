jest.mock('@/constants/env', () => ({
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

  it('maps CMS-hosted /assets URLs to trailing-slash proxy paths', () => {
    expect(getDirectusAssetUrl('/assets/abc.jpg')).toBe(
      '/api/cms/assets/abc.jpg/',
    );
  });

  it('maps bare file id via CMS assets to proxy paths', () => {
    expect(getDirectusAssetUrl('abc-123')).toBe('/api/cms/assets/abc-123/');
  });

  it('maps file id objects to proxy paths', () => {
    expect(getDirectusAssetUrl({ id: 'abc-123' })).toBe(
      '/api/cms/assets/abc-123/',
    );
  });

  it('maps nested /assets paths to proxy routes', () => {
    expect(
      getDirectusAssetUrl({
        id: 'abc-123',
        url: '/assets/abc-123/thumb',
      }),
    ).toBe('/api/cms/assets/abc-123/thumb/');
  });
});
