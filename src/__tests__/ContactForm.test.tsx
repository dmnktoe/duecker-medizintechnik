/* eslint-disable @typescript-eslint/no-explicit-any */

import { fireEvent, render } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { NextApiRequest, NextApiResponse } from 'next';
import React from 'react';
import { act } from 'react-dom/test-utils';

import initializeI18n from '@/lib/i18n-testing';

import ContactForm from '@/components/templates/ContactForm';

import form from '@/pages/api/form';

const mock = new MockAdapter(axios);

jest.mock('react-google-recaptcha', () => {
  return React.forwardRef<HTMLDivElement>((_props, ref) => {
    const executeAsync = () => Promise.resolve('mocked_token');
    const reset = () => {};

    // Attach the executeAsync and reset functions to the ref
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

global.fetch = jest.fn((): Promise<any> => {
  return Promise.resolve({
    json: (): Promise<any> => Promise.resolve({ success: true }),
  });
}) as any;

describe('ContactForm', () => {
  beforeEach(async () => {
    await initializeI18n(['common', 'contact']);
  });

  it('should render correctly', () => {
    const { getByLabelText, getByRole } = render(<ContactForm />);

    expect(getByLabelText(/Ihr Vor- & Nachname/i)).toBeInTheDocument();
    expect(getByLabelText(/Ihre E-Mail/i)).toBeInTheDocument();
    expect(getByLabelText(/Ihre Telefonnummer/i)).toBeInTheDocument();
    expect(getByLabelText(/Ihre Nachricht/i)).toBeInTheDocument();
    expect(getByLabelText(/Ich habe die/i)).toBeInTheDocument();
    expect(getByRole('button', { name: /Absenden/i })).toBeInTheDocument();
  });

  it('should submit the form correctly', async () => {
    mock.onPost('/api/form').reply(200, { message: 'success' });

    const { getByLabelText, getByRole } = render(<ContactForm />);

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

    // Create a mock request and response object
    const req: NextApiRequest = {
      body: {
        fullName: 'John Doe',
        email: 'johndoe@example.com',
        phone: '9876543210',
        message: 'Test Test Test Test',
      },
    } as NextApiRequest;

    const res: NextApiResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    // Call the form API route
    await form(req, res);

    // Assert that the response status and message are correct
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'success' });
  });
});
