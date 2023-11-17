import { formatDate, getStrapiMedia, openGraph } from '@/lib/helper';

describe('Open Graph function should work correctly', () => {
  it('should not return templateTitle when not specified', () => {
    const result = openGraph({
      description: 'Test description',
      siteName: 'Test site name',
    });
    expect(result).not.toContain('&templateTitle=');
  });

  it('should return templateTitle when specified', () => {
    const result = openGraph({
      templateTitle: 'Test Template Title',
      description: 'Test description',
      siteName: 'Test site name',
    });
    expect(result).toContain('&templateTitle=Test%20Template%20Title');
  });
});

describe('getStrapiMedia function', () => {
  it('should return the full URL if the media is hosted on an external provider', () => {
    const url = 'http://external-provider.com/media.jpg';
    const result = getStrapiMedia(url);
    expect(result).toBe(url);
  });

  it('should return the URL prepended with the Strapi URL if the media is not hosted on an external provider', () => {
    const url = '/media.jpg';
    const result = getStrapiMedia(url);
    expect(result).toBe('https://cms.duecker-medizintechnik.de' + url);
  });

  it('should return an empty string if the URL is null', () => {
    const url = null;
    const result = getStrapiMedia(url);
    expect(result).toBe('');
  });
});

describe('formatDate function', () => {
  it('should return the correct date format', () => {
    const result = formatDate(new Date('2022-01-01'));
    expect(result).toBe('1. Januar 2022');
  });
});
