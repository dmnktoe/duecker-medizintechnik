import { getStrapiMedia } from '@/lib/strapi-urls';

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
