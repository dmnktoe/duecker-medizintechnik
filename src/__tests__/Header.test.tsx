import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Header } from '@/components/layout/Header';

import initializeI18n from '@/utils/i18n-testing';

describe('Header', () => {
  beforeEach(async () => {
    await initializeI18n(['common']);
    render(<Header />);
  });
  it('should render the header', async () => {
    expect(
      await screen.findByText('Navigation umschalten'),
    ).toBeInTheDocument();
  });
  it('should close and open the navigationMenu with navigationButton', async () => {
    const button = screen.getByTestId('navigationButton');
    fireEvent.click(button);
    const menu = screen.getByTestId('navigationMenu');
    expect(menu).toHaveClass('translate-x-0 opacity-100');
  });
  it('closes hamburger menu on escape key press', () => {
    const button = screen.getByTestId('navigationButton');
    fireEvent.click(button); // Open the menu
    const menu = screen.getByTestId('navigationMenu');
    expect(menu).toHaveClass('translate-x-0 opacity-100'); // Check if menu is open

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' }); // Simulate escape key press
    expect(menu).toHaveClass('translate-x-2 opacity-0'); // Check if menu is closed
  });
});
