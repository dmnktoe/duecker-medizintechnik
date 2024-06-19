import { render, screen } from '@testing-library/react';

import { Body } from '@/components/ui';

describe('Body', () => {
  it('renders without error', () => {
    render(<Body>Test Body</Body>);
    expect(screen.getByText('Test Body')).toBeInTheDocument();
  });

  it('renders with correct size', () => {
    render(<Body size='lg'>Test Body</Body>);
    const body = screen.getByText('Test Body');
    expect(body).toHaveClass('text-base md:text-lg');
  });

  it('renders with correct color', () => {
    render(<Body color='light'>Test Body</Body>);
    const body = screen.getByText('Test Body');
    expect(body).toHaveClass('text-light-gray');
  });

  it('renders with strong font weight when isStrong is true', () => {
    render(<Body isStrong={true}>Test Body</Body>);
    const body = screen.getByText('Test Body');
    expect(body).toHaveClass('font-semibold');
  });

  it('renders without margin when margin is false', () => {
    render(<Body margin={false}>Test Body</Body>);
    const body = screen.getByText('Test Body');
    expect(body).not.toHaveClass('mb-4');
  });

  it('renders with additional class', () => {
    render(<Body className='additional-class'>Test Body</Body>);
    const body = screen.getByText('Test Body');
    expect(body).toHaveClass('additional-class');
  });
});
