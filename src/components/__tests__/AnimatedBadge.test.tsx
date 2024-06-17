import { render, screen } from '@testing-library/react';

import { AnimatedBadge } from '@/components/ui/Badges/AnimatedBadge';

describe('AnimatedBadge', () => {
  it('renders without crashing', () => {
    render(<AnimatedBadge text='Test' />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('displays correct text', () => {
    render(<AnimatedBadge text='Correct Text' />);
    expect(screen.getByText('Correct Text')).toBeInTheDocument();
  });

  it('does not display incorrect text', () => {
    render(<AnimatedBadge text='Correct Text' />);
    expect(screen.queryByText('Incorrect Text')).toBeNull();
  });
});
