import { render, screen } from '@testing-library/react';
import React from 'react';

import { Header } from '@/components/layout/Header';

import initializeI18n from '@/utils/i18n-testing';

describe('Call to action', () => {
  beforeEach(async () => {
    await initializeI18n(['cta']);
    render(<Header />);
  });
  it('should render the header', async () => {
    expect(await screen.findByText('Toggle menu')).toBeInTheDocument();
  });
  {
    /*}
  it('should close and open the navigationMenu with navigationButton', async () => {
    expect(screen.getByTestId('navigationMenu')).not.toBeVisible();
    fireEvent.click(screen.getByTestId('navigationButton'));
    expect(screen.getByTestId('navigationMenu')).toBeVisible();
    fireEvent.click(screen.getByTestId('navigationButton'));
    expect(screen.getByTestId('navigationMenu')).not.toBeVisible();
  });
  it('should close the navigationMenu with Escape', async () => {
    fireEvent.click(screen.getByTestId('navigationButton'));
    expect(screen.getByTestId('navigationMenu')).toBeVisible();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.getByTestId('navigationMenu')).not.toBeVisible();
  });
  */
  }
});
