import { render, screen } from '@testing-library/react';

import TextRevealByWord from '@/components/templates/TextReveal';

describe('TextRevealByWord', () => {
  it('renders correctly with given text', () => {
    render(<TextRevealByWord text='Hello World' />);
    const words = screen.getAllByText('Hello');
    expect(words).toHaveLength(2);
    const words2 = screen.getAllByText('World');
    expect(words2).toHaveLength(2);
  });

  it('splits the text into words', () => {
    render(<TextRevealByWord text='Hello World' />);
    const words = screen.getAllByText(/Hello|World/);
    expect(words).toHaveLength(4);
  });

  it('renders correctly with single word text', () => {
    render(<TextRevealByWord text='Hello' />);
    const words = screen.getAllByText('Hello');
    expect(words).toHaveLength(2);
  });

  it('renders correctly with multiple spaces between words', () => {
    render(<TextRevealByWord text='Hello   World' />);
    const words = screen.getAllByText(/Hello|World/);
    expect(words).toHaveLength(4);
  });
});
