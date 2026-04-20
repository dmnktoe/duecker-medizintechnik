import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import createIntlWrapper from '@/lib/i18n-testing';

import { Header } from '@/components/layout/Header';

jest.mock('flagsmith/react', () => ({
  useFlags: () => ({ language_picker: { enabled: true } }),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/de',
  useParams: () => ({}),
  useSearchParams: () => new URLSearchParams(),
}));

describe('Header', () => {
  let wrapper: React.ComponentType<{ children: React.ReactNode }>;

  beforeEach(async () => {
    wrapper = await createIntlWrapper(['common']);
    render(<Header />, { wrapper });
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
    fireEvent.click(button);
    const menu = screen.getByTestId('navigationMenu');
    expect(menu).toHaveClass('translate-x-0 opacity-100');

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(menu).toHaveClass('translate-x-2 opacity-0');
  });

  it('closes hamburger menu on outer mousedown (backdrop)', () => {
    const button = screen.getByTestId('navigationButton');
    fireEvent.click(button);
    const menu = screen.getByTestId('navigationMenu');
    expect(menu).toHaveClass('translate-x-0 opacity-100');

    fireEvent.mouseDown(screen.getByTestId('mobile-navigation-overlay'));
    expect(menu).toHaveClass('translate-x-2 opacity-0');
  });

  it('closes mobile menu when a navigation link is activated', () => {
    const button = screen.getByTestId('navigationButton');
    fireEvent.click(button);
    const menu = screen.getByTestId('navigationMenu');
    expect(menu).toHaveClass('translate-x-0 opacity-100');

    fireEvent.click(screen.getByText('Impressum'));
    expect(menu).toHaveClass('translate-x-2 opacity-0');
  });
});
