/* eslint-disable @typescript-eslint/no-explicit-any */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React, { act } from 'react';

import createIntlWrapper from '@/lib/i18n-testing';

import ContactForm from '@/components/templates/ContactForm';

const getPayload = jest.fn();
const resetWidget = jest.fn();

jest.mock('@/components/templates/contact/AltchaWidget', () => {
  const { useImperativeHandle } = jest.requireActual<typeof React>('react');
  return {
    AltchaWidget: ({ ref }: { ref: React.Ref<unknown> }) => {
      useImperativeHandle(ref, () => ({
        getPayload: () => getPayload(),
        reset: () => resetWidget(),
      }));
      return <div>Mock ALTCHA</div>;
    },
  };
});

function mockResponse(status: number, body: unknown) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  };
}

async function fillForm(
  getByLabelText: (text: RegExp) => HTMLElement,
  overrides: Partial<Record<'name' | 'email' | 'message', string>> = {},
) {
  await act(async () => {
    fireEvent.input(getByLabelText(/Vor- und Nachname/i), {
      target: { value: overrides.name ?? 'John Doe' },
    });
    fireEvent.input(getByLabelText(/E-Mail-Adresse/i), {
      target: { value: overrides.email ?? 'johndoe@example.com' },
    });
    fireEvent.change(getByLabelText(/Worum geht es/i), {
      target: { value: 'repair' },
    });
    fireEvent.input(getByLabelText(/Ihre Nachricht/i), {
      target: { value: overrides.message ?? 'Test Test Test Test' },
    });
  });
}

async function submit() {
  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: /Nachricht senden/i }));
  });
}

describe('ContactForm', () => {
  let wrapper: React.ComponentType<{ children: React.ReactNode }>;

  beforeEach(async () => {
    wrapper = await createIntlWrapper(['common', 'contact']);
    getPayload.mockReset().mockResolvedValue('altcha-payload');
    resetWidget.mockReset();
    global.fetch = jest
      .fn()
      .mockResolvedValue(
        mockResponse(200, { ok: true, reference: 'DM-261030-ABCD' }),
      ) as any;
  });

  it('renders all fields, with company and phone marked optional', () => {
    const { getByLabelText, getByRole, getAllByText } = render(
      <ContactForm />,
      { wrapper },
    );

    expect(getByLabelText(/Vor- und Nachname/i)).toBeInTheDocument();
    expect(getByLabelText(/Firma/i)).toBeInTheDocument();
    expect(getByLabelText(/E-Mail-Adresse/i)).toHaveAttribute(
      'autocomplete',
      'email',
    );
    expect(getByLabelText(/Telefon/i)).toHaveAttribute('type', 'tel');
    expect(getByLabelText(/Worum geht es/i)).toBeInTheDocument();
    expect(getByLabelText(/Ihre Nachricht/i)).toBeInTheDocument();
    expect(getAllByText('optional')).toHaveLength(2);
    expect(
      getByRole('button', { name: /Nachricht senden/i }),
    ).toBeInTheDocument();
  });

  it('submits the form and shows a confirmation with reference', async () => {
    const { getByLabelText } = render(<ContactForm />, {
      wrapper,
    });

    await fillForm(getByLabelText);
    await submit();

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    const [url, init] = (global.fetch as jest.Mock).mock.calls[0];
    expect(url).toBe('/api/form/');
    expect(JSON.parse(init.body as string)).toEqual({
      name: 'John Doe',
      company: '',
      email: 'johndoe@example.com',
      phone: '',
      topic: 'repair',
      message: 'Test Test Test Test',
      locale: 'de',
      altcha: 'altcha-payload',
      website: '',
    });

    expect(
      await screen.findByText(/Ihre Nachricht ist angekommen/i),
    ).toBeInTheDocument();
    expect(screen.getByText('DM-261030-ABCD')).toBeInTheDocument();
    expect(screen.getByText(/johndoe@example.com/)).toBeInTheDocument();
    expect(resetWidget).toHaveBeenCalled();
  });

  it('lets the visitor send another message after success', async () => {
    const { getByLabelText } = render(<ContactForm />, {
      wrapper,
    });
    await fillForm(getByLabelText);
    await submit();

    await act(async () => {
      fireEvent.click(
        await screen.findByRole('button', { name: /Weitere Nachricht/i }),
      );
    });
    expect(screen.getByLabelText(/Vor- und Nachname/i)).toHaveValue('');
  });

  it('shows translated server-side field errors', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(
      mockResponse(422, {
        ok: false,
        error: 'validation_failed',
        fields: { email: 'email.error.invalid' },
      }),
    );
    const { getByLabelText } = render(<ContactForm />, {
      wrapper,
    });
    await fillForm(getByLabelText);
    await submit();

    expect(
      await screen.findByText(/Bitte prüfen Sie die markierten Felder/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/gültige E-Mail-Adresse ein, z\. B\./i),
    ).toBeInTheDocument();
  });

  it('keeps input and offers phone and e-mail when sending fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(
      mockResponse(502, { ok: false, error: 'send_failed' }),
    );
    const { getByLabelText } = render(<ContactForm />, {
      wrapper,
    });
    await fillForm(getByLabelText);
    await submit();

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/nicht zugestellt werden/i);
    expect(alert).toHaveTextContent('info@duecker-medizintechnik.de');
    expect(getByLabelText(/Vor- und Nachname/i)).toHaveValue('John Doe');
  });

  it('shows a network error when the request cannot be sent', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('offline'));
    const { getByLabelText } = render(<ContactForm />, {
      wrapper,
    });
    await fillForm(getByLabelText);
    await submit();

    expect(
      await screen.findByText(/Keine Verbindung zum Server/i),
    ).toBeInTheDocument();
  });

  it('does not submit when the spam check cannot be solved', async () => {
    getPayload.mockResolvedValueOnce(null);
    const { getByLabelText } = render(<ContactForm />, {
      wrapper,
    });
    await fillForm(getByLabelText);
    await submit();

    expect(
      await screen.findByText(/Spam-Prüfung ist fehlgeschlagen/i),
    ).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('validates required fields before sending', async () => {
    render(<ContactForm />, { wrapper });
    await submit();

    expect(
      await screen.findByText(/Bitte geben Sie Ihren Namen ein/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Bitte wählen Sie ein Thema aus/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Vor- und Nachname/i)).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
