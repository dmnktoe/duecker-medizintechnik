import { render, screen } from '@testing-library/react';
import React from 'react';

import { Header } from '@/components/layout/Header';

import initializeI18n from '@/utils/i18n-testing';

describe('Call to action', () => {
  beforeEach(async () => {
    await initializeI18n(['common']);
    render(<Header />);
  });
  it('should render the header', async () => {
    expect(
      await screen.findByText('Navigation umschalten'),
    ).toBeInTheDocument();
  });
});
