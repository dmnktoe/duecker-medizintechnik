import {
  ImageBannerRole,
  responsiveImageSizes,
} from '@/constant/responsive-image-sizes';

describe('responsiveImageSizes', () => {
  it('should have the correct values for each role', () => {
    const expectedSizes: Record<ImageBannerRole, string> = {
      hero: '100vw',
      projectThumbnail: '33vw',
      contact: '50vw',
      painting: '33vw',
    };

    expect(responsiveImageSizes).toEqual(expectedSizes);
  });
});
