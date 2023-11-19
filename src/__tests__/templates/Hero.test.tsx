import { render, screen } from '@testing-library/react';

import { Hero } from '@/components/templates/Hero';

import initializeI18n from '@/utils/i18n-testing';

describe('Intro', () => {
  beforeEach(async () => {
    await initializeI18n(['home']);
    render(<Hero />);
  });
  it('should render the intro section', async () => {
    expect(
      await screen.findByText(
        'Ihr Partner für Handelsvermittlung von pharma Erzeugnissen, medizinischen und orthopädischen Artikeln und Laborbedarf',
      ),
    ).toBeInTheDocument();
  });
});
