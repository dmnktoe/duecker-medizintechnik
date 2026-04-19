/* eslint-disable @typescript-eslint/no-explicit-any */

import { fireEvent, render } from '@testing-library/react';
import React, { act } from 'react';

import createIntlWrapper from '@/lib/i18n-testing';

import ContactForm from '@/components/templates/ContactForm';

jest.mock('react-google-recaptcha', () => {
  return React.forwardRef<HTMLDivElement>((_props, ref) => {
    const executeAsync = () => Promise.resolve('mocked_token');
    const reset = () => {};

    if (ref && typeof ref === 'object') {
      ref.current = {
        ...ref.current,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        executeAsync,
        reset,
      };
    }

    return <div ref={ref}>Mock ReCAPTCHA</div>;
  });
});

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue(true),
    use: jest.fn(),
  }),
}));

global.fetch = jest.fn((): Promise<any> =>
  Promise.resolve({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: (): Promise<any> => Promise.resolve({ message: 'success' }),
  }),
) as any;

describe('ContactForm', () => {
  let wrapper: React.ComponentType<{ children: React.ReactNode }>;

  beforeEach(async () => {
    wrapper = await createIntlWrapper(['common', 'contact']);
    (global.fetch as jest.Mock).mockClear();
  });

  it('should render correctly', () => {
    const { getByLabelText, getByRole } = render(<ContactForm />, { wrapper });

    expect(getByLabelText(/Ihr Vor- & Nachname/i)).toBeInTheDocument();
    expect(getByLabelText(/Ihre E-Mail/i)).toBeInTheDocument();
    expect(getByLabelText(/Ihre Telefonnummer/i)).toBeInTheDocument();
    expect(getByLabelText(/Ihre Nachricht/i)).toBeInTheDocument();
    expect(getByLabelText(/Ich habe die/i)).toBeInTheDocument();
    expect(getByRole('button', { name: /Absenden/i })).toBeInTheDocument();
  });

  it('should submit the form correctly', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: () => Promise.resolve({ message: 'success' }),
    });

    const { getByLabelText, getByRole } = render(<ContactForm />, { wrapper });

    await act(async () => {
      fireEvent.input(getByLabelText(/Ihr Vor- & Nachname/i), {
        target: { value: 'John Doe' },
      });
      fireEvent.input(getByLabelText(/Ihre E-Mail/i), {
        target: { value: 'johndoe@example.com' },
      });
      fireEvent.input(getByLabelText(/Ihre Telefonnummer/i), {
        target: { value: '0123456789' },
      });
      fireEvent.input(getByLabelText(/Ihre Nachricht/i), {
        target: { value: 'Test Test Test Test' },
      });
      fireEvent.click(getByLabelText(/Ich habe die/i));
      fireEvent.click(getByRole('button', { name: /Absenden/i }));
    });
  });
});
