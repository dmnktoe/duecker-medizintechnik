/* eslint-disable @typescript-eslint/no-explicit-any */

import { fireEvent, render, waitFor } from '@testing-library/react';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import React from 'react';

import ContactForm from '@/components/templates/ContactForm';

import form from '@/pages/api/form';
import initializeI18n from '@/utils/i18n-testing';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('react-google-recaptcha', () => {
  const MockReCAPTCHA = React.forwardRef<HTMLDivElement>((props, ref) => {
    // Store the executeAsync and reset functions in separate variables
    const executeAsync = () => Promise.resolve('mocked_token');
    const reset = () => {}; // Add this line

    // Attach the executeAsync and reset functions to the ref
    if (ref && typeof ref === 'object') {
      ref.current = {
        ...ref.current,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        executeAsync,
        reset, // Add this line
      };
    }

    return <div ref={ref}>Mock ReCAPTCHA</div>;
  });

  return MockReCAPTCHA;
});

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue(true),
    use: jest.fn(), // Add this line
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

  test('submits the form correctly', async () => {
    mockedAxios.post.mockResolvedValueOnce({ status: 200 });

    const { getByLabelText, getByRole } = render(<ContactForm />);

    fireEvent.input(getByLabelText(/Ihr Vor- & Nachname/i), {
      target: { value: 'Marc Duecker' },
    });
    fireEvent.input(getByLabelText(/Ihre E-Mail/i), {
      target: { value: 'info@duecker-medizintechnik.de' },
    });
    fireEvent.input(getByLabelText(/Ihre Telefonnummer/i), {
      target: { value: '0123456789' },
    });
    fireEvent.input(getByLabelText(/Ihre Nachricht/i), {
      target: { value: 'Test Test Test Test' },
    });
    fireEvent.click(getByLabelText(/Ich habe die/i));
    fireEvent.click(getByRole('button', { name: /Absenden/i }));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
      expect(mockedAxios.post).toHaveBeenCalledWith('/api/form', {
        fullName: 'Marc Duecker',
        email: 'info@duecker-medizintechnik.de',
        phone: '0123456789',
        message: 'Test Test Test Test',
        terms: true,
      });
    });
  });
});

describe('form API route', () => {
  test('handles the API request correctly', async () => {
    const req = {
      body: {
        fullName: 'John Doe',
        // ... rest of your form data ...
      },
    } as NextApiRequest;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    await form(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'success' });
  });
});
