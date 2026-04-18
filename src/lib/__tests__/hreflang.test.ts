import { getBaseUrl } from '@/lib/get-base-url';
import { getHreflangs } from '@/lib/hreflang';

jest.mock('@/lib/get-base-url', () => ({
  getBaseUrl: jest.fn(),
}));

describe('getHreflangs', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('generates hreflang tags for all configured locales with locale prefix', () => {
    (getBaseUrl as jest.Mock).mockReturnValue('https://example.com');
    const result = getHreflangs('/datenschutz');

    expect(result).toEqual([
      {
        rel: 'alternate',
        hrefLang: 'de',
        href: 'https://example.com/de/datenschutz',
      },
      {
        rel: 'alternate',
        hrefLang: 'en',
        href: 'https://example.com/en/datenschutz',
      },
    ]);
  });

  it('handles root path correctly', () => {
    (getBaseUrl as jest.Mock).mockReturnValue('https://example.com');
    const result = getHreflangs('/');

    expect(result).toEqual([
      { rel: 'alternate', hrefLang: 'de', href: 'https://example.com/de/' },
      { rel: 'alternate', hrefLang: 'en', href: 'https://example.com/en/' },
    ]);
  });
});
