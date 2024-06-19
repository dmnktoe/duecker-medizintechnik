import { render, screen } from '@testing-library/react';

import { Container } from '@/components/layout/Container';

describe('Container', () => {
  it('renders without error', () => {
    render(<Container>Test Content</Container>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies default width class', () => {
    render(<Container>Test Content</Container>);
    const container = screen.getByText('Test Content');
    expect(container).toHaveClass('max-w-[110rem]');
  });

  it('applies custom width class', () => {
    render(<Container width='max-w-[90rem]'>Test Content</Container>);
    const container = screen.getByText('Test Content');
    expect(container).toHaveClass('max-w-[90rem]');
  });

  it('applies additional class', () => {
    render(<Container className='additional-class'>Test Content</Container>);
    const container = screen.getByText('Test Content');
    expect(container).toHaveClass('additional-class');
  });
});
