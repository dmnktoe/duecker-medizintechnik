/* eslint-disable @typescript-eslint/no-explicit-any */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

global.fetch = jest.fn(
  (): Promise<any> =>
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
    (global.fetch as jest.Mock).mockReset();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: () => Promise.resolve({ message: 'success' }),
    });
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

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/form',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    });

    const [, init] = (global.fetch as jest.Mock).mock.calls[0];
    expect(JSON.parse(init.body as string)).toMatchObject({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '0123456789',
      message: 'Test Test Test Test',
      terms: true,
      token: 'mocked_token',
    });

    expect(
      await screen.findByText(/Vielen Dank für Ihre Nachricht/i),
    ).toBeInTheDocument();
  });

  it('shows API error message when response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: () =>
        Promise.resolve({ errors: ['Validation failed', 'Missing field'] }),
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

    expect(
      await screen.findByText(/Validation failed, Missing field/i),
    ).toBeInTheDocument();
  });

  it('shows generic API error when response is not ok without detail', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
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

    expect(
      await screen.findByText(/Die Nachricht konnte nicht gesendet werden\.$/i),
    ).toBeInTheDocument();
  });

  it('shows network error when fetch throws', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('offline'));

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

    expect(
      await screen.findByText(/Netzwerkfehler beim Senden/i),
    ).toBeInTheDocument();
  });

  it('validates required fields on submit', async () => {
    const { getByRole } = render(<ContactForm />, { wrapper });

    await act(async () => {
      fireEvent.click(getByRole('button', { name: /Absenden/i }));
    });

    expect(
      await screen.findByText(/Bitte geben Sie Ihren Vor- und Nachnamen ein/i),
    ).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
