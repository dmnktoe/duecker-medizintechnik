import { render, screen } from '@testing-library/react';

import { Intro } from '@/components/templates/Intro';

import initializeI18n from '@/utils/i18n-testing';

describe('Intro', () => {
  beforeEach(async () => {
    await initializeI18n(['home']);
    render(<Intro />);
  });
  it('should render the intro section', async () => {
    expect(
      await screen.findByText(
        'Ihr Partner für Handelsvermittlung von pharma Erzeugnissen, medizinischen und orthopädischen Artikeln und Laborbedarf',
      ),
    ).toBeInTheDocument();
  });
});
