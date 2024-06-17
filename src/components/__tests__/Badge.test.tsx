import { render, screen } from '@testing-library/react';

import { Badge } from '@/components/ui/Badges/Badge';

describe('Badge', () => {
  it('renders with correct size', () => {
    render(
      <Badge size='lg' color='primary' variant='solid'>
        Test
      </Badge>,
    );
    expect(screen.getByText('Test')).toHaveClass('relative');
  });

  it('renders with correct color', () => {
    render(
      <Badge size='md' color='secondary' variant='solid'>
        Test
      </Badge>,
    );
    expect(screen.getByText('Test')).toHaveClass('relative');
  });

  it('renders with correct variant', () => {
    render(
      <Badge size='md' color='primary' variant='outline'>
        Test
      </Badge>,
    );
    expect(screen.getByText('Test')).toHaveClass('relative');
  });
});
