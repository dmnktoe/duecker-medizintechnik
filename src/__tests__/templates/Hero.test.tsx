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
        'Ihr Partner für Reparatur und Service chirurgischer Instrumente, Herstellung und Vertrieb von sterilen Schlauchsystemen, Medizinprodukten und Dienstleistungen',
      ),
    ).toBeInTheDocument();
  });
});
