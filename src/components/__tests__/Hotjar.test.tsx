jest.mock('@c15t/nextjs', () => ({
  useConsentManager: () => ({
    has: (category: string) => category === 'measurement',
  }),
}));

import { render } from '@testing-library/react';

import Hotjar from '@/components/helpers/Hotjar';

describe('Hotjar Component', () => {
  it('should render Hotjar script with correct HOTJAR_ID', () => {
    render(<Hotjar HOTJAR_ID='HJ_TEST_ID' />);

    const hotjarScript = document.getElementById('hotjar');
    expect(hotjarScript).not.toBeNull();
    expect(hotjarScript?.innerHTML).toContain('HJ_TEST_ID');
  });
});
