import { getBaseUrl } from '@/lib/get-base-url';
import { generateHreflangTags, getHreflangs } from '@/lib/hreflang';

import i18nextConfig from '../../../next-i18next.config';

jest.mock('@/lib/get-base-url', () => ({
  getBaseUrl: jest.fn(),
}));

describe('generateHreflangTags', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('generates hreflang tags for all locales', () => {
    (getBaseUrl as jest.Mock).mockReturnValue('https://example.com');
    const locales = ['de', 'en', 'fr'];
    const currentPath = '/datenschutz/';
    const result = generateHreflangTags(locales, currentPath);

    expect(result).toEqual([
      {
        rel: 'alternate',
        hrefLang: 'de',
        href: 'https://example.com/datenschutz/',
      },
      {
        rel: 'alternate',
        hrefLang: 'en',
        href: 'https://example.com/en/datenschutz/',
      },
      {
        rel: 'alternate',
        hrefLang: 'fr',
        href: 'https://example.com/fr/datenschutz/',
      },
    ]);
  });

  it('handles base URL correctly for default locale', () => {
    (getBaseUrl as jest.Mock).mockReturnValue('https://example.com');
    const locales = ['de'];
    const currentPath = '/datenschutz/';
    const result = generateHreflangTags(locales, currentPath);

    expect(result).toEqual([
      {
        rel: 'alternate',
        hrefLang: 'de',
        href: 'https://example.com/datenschutz/',
      },
    ]);
  });

  it('handles empty locales array', () => {
    (getBaseUrl as jest.Mock).mockReturnValue('https://example.com');
    const locales: string[] = [];
    const currentPath = '/datenschutz/';
    const result = generateHreflangTags(locales, currentPath);

    expect(result).toEqual([]);
  });
});

describe('getHreflangs', () => {
  it('returns hreflang tags using i18nextConfig locales', () => {
    (getBaseUrl as jest.Mock).mockReturnValue('https://example.com');
    i18nextConfig.i18n.locales = ['de', 'en'];
    const currentPath = '/datenschutz/';
    const result = getHreflangs(currentPath);

    expect(result).toEqual([
      {
        rel: 'alternate',
        hrefLang: 'de',
        href: 'https://example.com/datenschutz/',
      },
      {
        rel: 'alternate',
        hrefLang: 'en',
        href: 'https://example.com/en/datenschutz/',
      },
    ]);
  });
});
