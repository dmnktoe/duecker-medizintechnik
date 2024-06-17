import { render, screen } from '@testing-library/react';
import { ImSpinner2 } from 'react-icons/im';

import IconButton from '@/components/ui/Buttons/IconButton';

describe('IconButton', () => {
  it('renders without crashing', () => {
    render(<IconButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('displays loading spinner when loading', () => {
    render(<IconButton isLoading={true} />);
    expect(screen.getByRole('button')).toContainHTML('<svg');
  });

  it('does not display loading spinner when not loading', () => {
    render(<IconButton isLoading={false} />);
    const button = screen.getByRole('button');
    expect(button.querySelector('svg')).toBeNull();
  });

  it('displays correct icon', () => {
    render(<IconButton icon={ImSpinner2} />);
    expect(screen.getByRole('button')).toContainHTML('<svg');
  });

  it('renders with correct variant', () => {
    render(<IconButton variant='outline' />);
    expect(screen.getByRole('button')).toHaveClass('border border-primary-500');
  });

  it('renders with correct disabled state', () => {
    render(<IconButton disabled={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
