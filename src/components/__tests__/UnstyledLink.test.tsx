import { render, screen } from '@testing-library/react';

import { UnstyledLink } from '@/components/ui';

describe('UnstyledLink', () => {
  it('renders without error', () => {
    render(<UnstyledLink href='#'>Test Link</UnstyledLink>);
    expect(screen.getByText('Test Link')).toBeInTheDocument();
  });

  it('renders with additional class', () => {
    render(
      <UnstyledLink href='#' className='additional-class'>
        Test Link
      </UnstyledLink>,
    );
    const link = screen.getByText('Test Link');
    expect(link).toHaveClass('additional-class');
  });

  it('opens in new tab when openNewTab is true', () => {
    render(
      <UnstyledLink href='#' openNewTab={true}>
        Test Link
      </UnstyledLink>,
    );
    const link = screen.getByText('Test Link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not open in new tab when openNewTab is false', () => {
    render(
      <UnstyledLink href='#' openNewTab={false}>
        Test Link
      </UnstyledLink>,
    );
    const link = screen.getByText('Test Link');
    expect(link).not.toHaveAttribute('target', '_blank');
    expect(link).not.toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('opens in new tab when href is external', () => {
    render(<UnstyledLink href='http://external.com'>Test Link</UnstyledLink>);
    const link = screen.getByText('Test Link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not open in new tab when href is internal', () => {
    render(<UnstyledLink href='/internal'>Test Link</UnstyledLink>);
    const link = screen.getByText('Test Link');
    expect(link).not.toHaveAttribute('target', '_blank');
    expect(link).not.toHaveAttribute('rel', 'noopener noreferrer');
  });
});
