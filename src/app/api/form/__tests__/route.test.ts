/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';

import { POST } from '../route';

const sendMail = jest.fn();
const use = jest.fn();

jest.mock('nodemailer-express-handlebars', () => ({
  __esModule: true,
  default: jest.fn(() => jest.fn()),
}));

jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail,
    use,
  })),
}));

jest.mock('@sentry/nextjs', () => ({
  captureException: jest.fn(),
}));

function makeJsonRequest(body: unknown) {
  return new NextRequest('http://localhost/api/form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/form', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = {
      ...originalEnv,
      RECAPTCHA_SECRET_KEY: 'test-secret',
      SMTP_PORT: '465',
      SMTP_HOST: 'smtp.test',
      SMTP_USER: 'user',
      SMTP_PASSWORD: 'pass',
      CONTACT_FORM_SEND_EMAIL_DOMAIN: 'example.com',
      CONTACT_FORM_RECEIVE_EMAIL: 'inbox@example.com',
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ success: true }),
    }) as unknown as typeof fetch;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns 400 for invalid JSON body', async () => {
    const req = new NextRequest('http://localhost/api/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'not-json{',
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({
      errors: ['Invalid request body'],
    });
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('returns 400 when reCAPTCHA validation fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ success: false }),
    });

    const res = await POST(
      makeJsonRequest({
        name: 'A',
        email: 'a@b.c',
        phone: '1',
        message: '1234567890',
        token: 'bad',
      }),
    );

    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({
      errors: ["It's a bot! ❤️ ❌ 🤖"],
    });
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('calls sendMail with form context when human verification succeeds', async () => {
    const payload = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '+49 1',
      message: 'Hello world!',
      token: 'good-token',
    };

    const res = await POST(makeJsonRequest(payload));

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ message: 'success' });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        'https://www.google.com/recaptcha/api/siteverify?secret=test-secret&response=good-token',
      ),
      { method: 'POST' },
    );

    expect(sendMail).toHaveBeenCalledTimes(1);
    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'Jane Doe no-reply@example.com',
        replyTo: 'jane@example.com',
        to: 'inbox@example.com',
        subject: 'Neue Anfrage, Dücker Medizintechnik Kontaktformular',
        template: 'contact',
        context: {
          name: 'Jane Doe',
          email: 'jane@example.com',
          phone: '+49 1',
          message: 'Hello world!',
        },
      }),
    );
  });

  it('returns 500 when sendMail throws', async () => {
    sendMail.mockRejectedValueOnce(new Error('SMTP down'));

    const res = await POST(
      makeJsonRequest({
        name: 'X',
        email: 'x@y.z',
        phone: '1',
        message: '1234567890',
        token: 'tok',
      }),
    );

    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({ message: 'an error occurred' });
  });
});
