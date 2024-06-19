import { render, screen } from '@testing-library/react';

import { Title } from '@/components/ui';

describe('Title', () => {
  it('renders without error', () => {
    render(<Title>Test Title</Title>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders with correct size', () => {
    render(<Title size='five'>Test Title</Title>);
    const title = screen.getByText('Test Title');
    expect(title).toHaveClass('text-lg md:text-xl');
  });

  it('renders with correct margin', () => {
    render(<Title margin={false}>Test Title</Title>);
    const title = screen.getByText('Test Title');
    expect(title).not.toHaveClass('mb-4');
  });

  it('renders with correct tag', () => {
    render(<Title renderAs='h2'>Test Title</Title>);
    const title = screen.getByText('Test Title');
    expect(title.tagName).toBe('H2');
  });

  it('renders with additional class', () => {
    render(<Title className='additional-class'>Test Title</Title>);
    const title = screen.getByText('Test Title');
    expect(title).toHaveClass('additional-class');
  });
});
