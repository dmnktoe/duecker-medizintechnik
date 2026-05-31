jest.mock('@c15t/nextjs', () => ({
  useConsentManager: () => ({
    has: (category: string) => category === 'measurement',
  }),
}));

import { render } from '@testing-library/react';

import Umami from '@/components/helpers/Umami';

afterEach(() => {
  document.querySelectorAll('script').forEach((el) => el.remove());
});

describe('Umami Component', () => {
  it('should render Umami script with correct website id', () => {
    render(
      <Umami
        UMAMI_WEBSITE_ID='UMAMI_TEST_ID'
        UMAMI_SRC='https://analytics.example.com/script.js'
      />,
    );

    const umamiScript = document.getElementById('umami');
    expect(umamiScript).not.toBeNull();
    expect(umamiScript?.getAttribute('data-website-id')).toBe('UMAMI_TEST_ID');
    expect(umamiScript?.getAttribute('src')).toBe(
      'https://analytics.example.com/script.js',
    );
  });

  it('should not render when UMAMI_WEBSITE_ID is undefined', () => {
    render(
      <Umami
        UMAMI_WEBSITE_ID={undefined}
        UMAMI_SRC='https://analytics.example.com/script.js'
      />,
    );

    const umamiScript = document.getElementById('umami');
    expect(umamiScript).toBeNull();
  });

  it('should not render when UMAMI_SRC is undefined', () => {
    render(<Umami UMAMI_WEBSITE_ID='UMAMI_TEST_ID' UMAMI_SRC={undefined} />);

    const umamiScript = document.getElementById('umami');
    expect(umamiScript).toBeNull();
  });
});
