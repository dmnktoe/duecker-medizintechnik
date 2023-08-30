import { render, screen } from '@testing-library/react';

import { CallToAction } from '@/components/templates/CallToAction';

import initializeI18n from '@/utils/i18n-testing';

describe('404', () => {
  beforeEach(async () => {
    await initializeI18n(['cta']);
    render(<CallToAction />);
  });
  it('should render the call to action section', async () => {
    expect(
      await screen.findByText('Benötigen Sie Hilfe bei der Aufbereitung?')
    ).toBeInTheDocument();
  });
});
