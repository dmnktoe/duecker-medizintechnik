/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';

const sendMail = jest.fn();
const createTransport = jest.fn((_options?: unknown) => ({ sendMail }));

jest.mock('nodemailer', () => ({
  __esModule: true,
  default: {
    createTransport: (options: unknown) => createTransport(options),
  },
}));

const captureException = jest.fn();
const captureMessage = jest.fn();
jest.mock('@sentry/nextjs', () => ({
  captureException: (...args: unknown[]) => captureException(...args),
  captureMessage: (...args: unknown[]) => captureMessage(...args),
}));

const verifyContactChallenge = jest.fn();
jest.mock('@/lib/contact/altcha', () => ({
  verifyContactChallenge: (...args: unknown[]) =>
    verifyContactChallenge(...args),
}));

const checkEmailDomain = jest.fn();
jest.mock('@/lib/contact/email-domain', () => ({
  checkEmailDomain: (...args: unknown[]) => checkEmailDomain(...args),
}));

const validBody = {
  name: 'Jane Doe',
  company: 'Klinikum Test',
  email: 'jane@example.com',
  phone: '+49 1234 5678',
  topic: 'repair',
  message: 'Please repair our scissors.',
  locale: 'de',
  altcha: 'payload',
};

let ipCounter = 0;
function makeRequest(body: unknown, ip = `10.0.0.${++ipCounter}`) {
  return new NextRequest('http://localhost/api/form/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': ip },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

describe('POST /api/form', () => {
  const originalEnv = process.env;
  let POST: typeof import('../route').POST;

  beforeAll(async () => {
    ({ POST } = await import('../route'));
  });

  beforeEach(() => {
    jest.clearAllMocks();
    sendMail.mockResolvedValue({ messageId: 'x' });
    verifyContactChallenge.mockResolvedValue({ ok: true });
    checkEmailDomain.mockResolvedValue('ok');
    process.env = {
      ...originalEnv,
      SMTP_PORT: '465',
      SMTP_HOST: 'smtp.test',
      SMTP_USER: 'website@example.com',
      SMTP_PASSWORD: 'pass',
      CONTACT_FORM_SEND_EMAIL_DOMAIN: 'example.com',
      CONTACT_FORM_RECEIVE_EMAIL: 'inbox@example.com',
    };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('rejects invalid JSON', async () => {
    const res = await POST(makeRequest('not-json{'));
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({
      ok: false,
      error: 'invalid_request',
    });
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('returns field errors for invalid input', async () => {
    const res = await POST(
      makeRequest({ ...validBody, email: 'nope', message: 'short' }),
    );
    expect(res.status).toBe(422);
    const body = await res.json();
    expect(body).toMatchObject({
      ok: false,
      error: 'validation_failed',
      fields: {
        email: 'email.error.invalid',
        message: 'message.error.minLength',
      },
    });
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('rejects links in the name', async () => {
    const res = await POST(
      makeRequest({ ...validBody, name: 'Buy now https://spam.example' }),
    );
    expect(res.status).toBe(422);
    expect((await res.json()).fields.name).toBe('name.error.invalid');
  });

  it('rejects a failed spam check and reports it', async () => {
    verifyContactChallenge.mockResolvedValueOnce({
      ok: false,
      reason: 'expired',
    });
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(403);
    await expect(res.json()).resolves.toEqual({
      ok: false,
      error: 'captcha_failed',
    });
    expect(captureMessage).toHaveBeenCalled();
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('rejects an e-mail domain that cannot receive mail', async () => {
    checkEmailDomain.mockResolvedValueOnce('invalid');
    const res = await POST(
      makeRequest({ ...validBody, email: 'jane@ss-fastner.com' }),
    );
    expect(res.status).toBe(422);
    await expect(res.json()).resolves.toEqual({
      ok: false,
      error: 'validation_failed',
      fields: { email: 'email.error.domain' },
    });
    expect(checkEmailDomain).toHaveBeenCalledWith('jane@ss-fastner.com', {
      knownGood: 'inbox@example.com',
    });
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('still sends when the e-mail domain cannot be checked', async () => {
    checkEmailDomain.mockResolvedValueOnce('unknown');
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
    expect(sendMail).toHaveBeenCalledTimes(2);
    expect(captureMessage).toHaveBeenCalledWith(
      'Contact form: e-mail domain check unavailable',
      expect.objectContaining({ level: 'warning' }),
    );
  });

  it('ignores unknown fields such as the old honeypot', async () => {
    const res = await POST(
      makeRequest({ ...validBody, website: 'https://example.org' }),
    );
    expect(res.status).toBe(200);
    expect(sendMail).toHaveBeenCalledTimes(2);
  });

  it('sends the enquiry to the team and a receipt to the visitor', async () => {
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.reference).toMatch(/^DM-\d{6}-[A-Z2-9]{4}$/);

    expect(createTransport).toHaveBeenCalledWith(
      expect.objectContaining({
        host: 'smtp.test',
        port: 465,
        secure: true,
        tls: { rejectUnauthorized: true },
      }),
    );

    expect(sendMail).toHaveBeenCalledTimes(2);
    const [internal] = sendMail.mock.calls[0];
    expect(internal).toMatchObject({
      from: {
        name: 'Dücker Medizintechnik Website',
        address: 'no-reply@example.com',
      },
      to: 'inbox@example.com',
      replyTo: { name: 'Jane Doe', address: 'jane@example.com' },
      envelope: { from: 'website@example.com', to: 'inbox@example.com' },
    });
    expect(internal.subject).toContain('Reparatur & Service');
    expect(internal.subject).toContain(body.reference);
    expect(internal.text).toContain('Please repair our scissors.');
    expect(internal.html).toContain('Klinikum Test');

    const [receipt] = sendMail.mock.calls[1];
    expect(receipt).toMatchObject({
      to: { name: 'Jane Doe', address: 'jane@example.com' },
      replyTo: 'inbox@example.com',
      headers: { 'Auto-Submitted': 'auto-replied' },
    });
    expect(receipt.subject).toContain(body.reference);
    expect(receipt.text).not.toContain('Please repair our scissors.');
    expect(receipt.html).not.toContain('Please repair our scissors.');
  });

  it('escapes HTML in the team notification', async () => {
    await POST(
      makeRequest({ ...validBody, message: '<script>alert(1)</script> hi' }),
    );
    const [internal] = sendMail.mock.calls[0];
    expect(internal.html).not.toContain('<script>');
    expect(internal.html).toContain('&lt;script&gt;');
  });

  it('sends the receipt in English for English visitors', async () => {
    await POST(makeRequest({ ...validBody, locale: 'en' }));
    const [receipt] = sendMail.mock.calls[1];
    expect(receipt.subject).toMatch(/^Your enquiry/);
  });

  it('returns 502 and reports to Sentry when the team mail fails', async () => {
    sendMail.mockRejectedValueOnce(new Error('SMTP down'));
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(502);
    await expect(res.json()).resolves.toEqual({
      ok: false,
      error: 'send_failed',
    });
    expect(captureException).toHaveBeenCalled();
  });

  it('still succeeds when only the receipt fails', async () => {
    sendMail
      .mockResolvedValueOnce({ messageId: 'team' })
      .mockRejectedValueOnce(new Error('mailbox full'));
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
    expect(captureException).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({ level: 'warning' }),
    );
  });

  it('reports missing configuration instead of failing silently', async () => {
    delete process.env.SMTP_HOST;
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(500);
    await expect(res.json()).resolves.toEqual({
      ok: false,
      error: 'not_configured',
    });
    expect(captureException).toHaveBeenCalled();
  });

  it('rate limits repeated submissions from one IP', async () => {
    const statuses: number[] = [];
    for (let i = 0; i < 6; i++) {
      statuses.push((await POST(makeRequest(validBody, '192.0.2.99'))).status);
    }
    expect(statuses.slice(0, 5)).toEqual([200, 200, 200, 200, 200]);
    expect(statuses[5]).toBe(429);
  });
});
