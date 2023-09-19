import { fireEvent, render, screen } from '@testing-library/react';

import Button from '@/components/ui/buttons/Button';

describe('Button', () => {
  test('renders correctly', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  test('handles click', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('shows loading state', () => {
    render(<Button isLoading>Test Button</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByText('Test Button')).toHaveClass('text-transparent');
    expect(screen.getByText('Test Button')).toHaveClass('relative');
    expect(screen.getByText('Test Button')).toHaveClass('transition-none');
    expect(screen.getByText('Test Button')).toHaveClass(
      'hover:text-transparent',
    );
    expect(screen.getByText('Test Button')).toHaveClass('disabled:cursor-wait');
  });
});
