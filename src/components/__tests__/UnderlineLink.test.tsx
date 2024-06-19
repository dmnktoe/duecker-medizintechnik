import { render, screen } from '@testing-library/react';

import { UnderlineLink } from '@/components/ui';

describe('UnderlineLink', () => {
  it('renders without error', () => {
    render(<UnderlineLink href='#'>Test Link</UnderlineLink>);
    expect(screen.getByText('Test Link')).toBeInTheDocument();
  });

  it('renders with underline always', () => {
    render(
      <UnderlineLink href='#' underline='always'>
        Test Link
      </UnderlineLink>,
    );
    const link = screen.getByText('Test Link');
    expect(link).toHaveClass('underline hover:no-underline');
  });

  it('renders with underline on hover', () => {
    render(
      <UnderlineLink href='#' underline='hover'>
        Test Link
      </UnderlineLink>,
    );
    const link = screen.getByText('Test Link');
    expect(link).toHaveClass('hover:underline');
  });

  it('renders with additional class', () => {
    render(
      <UnderlineLink href='#' className='additional-class'>
        Test Link
      </UnderlineLink>,
    );
    const link = screen.getByText('Test Link');
    expect(link).toHaveClass('additional-class');
  });
});
