import { render, screen } from '@testing-library/react';

import { TextArea } from '@/components/ui';

describe('TextArea', () => {
  const mockRegister = jest.fn();

  it('renders without error', () => {
    render(
      <TextArea
        id='test'
        label='Test Label'
        placeholder='Test Placeholder'
        register={mockRegister}
      />,
    );
    expect(screen.getByLabelText(/Test Label\*/i)).toBeInTheDocument();
  });

  it('displays placeholder text', () => {
    render(
      <TextArea
        id='test'
        label='Test Label'
        placeholder='Test Placeholder'
        register={mockRegister}
      />,
    );
    expect(
      screen.getByPlaceholderText(/Test Placeholder/i),
    ).toBeInTheDocument();
  });

  it('displays error message when error is present', () => {
    const errorMessage = 'This field is required';
    render(
      <TextArea
        id='test'
        label='Test Label'
        placeholder='Test Placeholder'
        register={mockRegister}
        error={{ message: errorMessage, type: 'required' }}
      />,
    );
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('does not display error message when error is not present', () => {
    render(
      <TextArea
        id='test'
        label='Test Label'
        placeholder='Test Placeholder'
        register={mockRegister}
      />,
    );
    expect(
      screen.queryByText(/This field is required/i),
    ).not.toBeInTheDocument();
  });

  it('calls register function with id', () => {
    render(
      <TextArea
        id='test'
        label='Test Label'
        placeholder='Test Placeholder'
        register={mockRegister}
      />,
    );
    expect(mockRegister).toHaveBeenCalledWith('test');
  });
});
