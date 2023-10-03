import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import { CallToAction } from '@/components/templates/CallToAction';

import initializeI18n from '@/utils/i18n-testing';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/lib/gtagHelper', () => ({
  event: jest.fn(),
}));

describe('Call To Action', () => {
  beforeEach(async () => {
    await initializeI18n(['common']);
    global.gtag = jest.fn();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should render the call to action section', async () => {
    render(<CallToAction />);
    expect(
      await screen.findByText('Benötigen Sie Hilfe bei der Aufbereitung?'),
    ).toBeInTheDocument();
  });
  it('calls router.push when button is clicked', () => {
    const mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    const { getByText } = render(<CallToAction />);
    const button = getByText('Angebot anfordern');

    fireEvent.click(button);

    expect(mockRouter.push).toHaveBeenCalledWith('/kontakt');
  });
  it('calls event function when button is clicked in production', () => {
    const mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    process.env.NODE_ENV = 'production';
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { event } = require('@/lib/gtagHelper');
    // render component
    const { getByText } = render(<CallToAction />);
    const button = getByText('Angebot anfordern');
    // click button
    fireEvent.click(button);
    // expect event to be called with correct arguments
    expect(event).toHaveBeenCalledWith({
      category: 'cta',
      action: 'click',
      label: 'cta button',
      value: 1,
    });
    expect(mockRouter.push).toHaveBeenCalledWith('/kontakt');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    process.env.NODE_ENV = 'test';
  });
});
