import { fireEvent, render, screen } from '@testing-library/react';

import { Checkbox } from '@/components/ui';

describe('Checkbox', () => {
  const mockRegister = jest.fn();

  it('renders without error', () => {
    render(
      <Checkbox
        id='test'
        label='Test Label'
        register={mockRegister}
        error={null}
      />,
    );
    expect(screen.getByLabelText(/Test Label/i)).toBeInTheDocument();
  });

  it('displays error message when error is present', () => {
    const errorMessage = 'This field is required';
    render(
      <Checkbox
        id='test'
        label='Test Label'
        register={mockRegister}
        error={{ message: errorMessage }}
      />,
    );
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('does not display error message when error is not present', () => {
    render(
      <Checkbox
        id='test'
        label='Test Label'
        register={mockRegister}
        error={null}
      />,
    );
    expect(
      screen.queryByText(/This field is required/i),
    ).not.toBeInTheDocument();
  });

  it('calls register function with id', () => {
    render(
      <Checkbox
        id='test'
        label='Test Label'
        register={mockRegister}
        error={null}
      />,
    );
    expect(mockRegister).toHaveBeenCalledWith('test');
  });

  it('changes state when clicked', () => {
    render(
      <Checkbox
        id='test'
        label='Test Label'
        register={mockRegister}
        error={null}
      />,
    );
    const checkbox = screen.getByLabelText(/Test Label/i);
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
