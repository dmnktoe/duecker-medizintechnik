import { render, screen } from '@testing-library/react';

import { Input } from '@/components/ui';

describe('Input', () => {
  const mockRegister = jest.fn();

  it('renders without error', () => {
    render(
      <Input
        id='test'
        label='Test Label'
        placeholder='Test Placeholder'
        register={mockRegister}
        type='text'
        autocomplete='off'
      />,
    );
    expect(screen.getByLabelText(/Test Label\*/i)).toBeInTheDocument();
  });

  it('displays placeholder text', () => {
    render(
      <Input
        id='test'
        label='Test Label'
        placeholder='Test Placeholder'
        register={mockRegister}
        type='text'
        autocomplete='off'
      />,
    );
    expect(
      screen.getByPlaceholderText(/Test Placeholder/i),
    ).toBeInTheDocument();
  });

  it('displays error message when error is present', () => {
    const errorMessage = 'This field is required';
    render(
      <Input
        id='test'
        label='Test Label'
        placeholder='Test Placeholder'
        register={mockRegister}
        error={{ message: errorMessage, type: 'required' }}
        type='text'
        autocomplete='off'
      />,
    );
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('does not display error message when error is not present', () => {
    render(
      <Input
        id='test'
        label='Test Label'
        placeholder='Test Placeholder'
        register={mockRegister}
        type='text'
        autocomplete='off'
      />,
    );
    expect(
      screen.queryByText(/This field is required/i),
    ).not.toBeInTheDocument();
  });

  it('calls register function with id', () => {
    render(
      <Input
        id='test'
        label='Test Label'
        placeholder='Test Placeholder'
        register={mockRegister}
        type='text'
        autocomplete='off'
      />,
    );
    expect(mockRegister).toHaveBeenCalledWith('test');
  });
});
