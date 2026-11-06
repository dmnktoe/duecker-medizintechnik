import { createHmac } from 'crypto';

export interface ContactConfig {
  smtp: {
    host: string;
    port: number;
    user: string;
    password: string;
    rejectUnauthorized: boolean;
  };
  inbox: string;
  /** Hidden copies of every enquiry (e.g. a private address). */
  bcc: string[];
  from: string;
  altchaSecret: string;
}

export function getContactConfig(
  env: NodeJS.ProcessEnv = process.env,
): ContactConfig {
  const required = [
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASSWORD',
    'CONTACT_FORM_RECEIVE_EMAIL',
  ] as const;
  const missing: string[] = required.filter((key) => !env[key]);
  if (!env.CONTACT_FORM_FROM_EMAIL && !env.CONTACT_FORM_SEND_EMAIL_DOMAIN) {
    missing.push('CONTACT_FORM_FROM_EMAIL');
  }
  const port = Number(env.SMTP_PORT);
  if (env.SMTP_PORT && !Number.isInteger(port)) missing.push('SMTP_PORT');
  if (missing.length > 0) {
    throw new Error(`Contact form is missing env vars: ${missing.join(', ')}`);
  }

  return {
    smtp: {
      host: env.SMTP_HOST!,
      port,
      user: env.SMTP_USER!,
      password: env.SMTP_PASSWORD!,
      rejectUnauthorized: env.SMTP_TLS_REJECT_UNAUTHORIZED !== 'false',
    },
    inbox: env.CONTACT_FORM_RECEIVE_EMAIL!,
    bcc: (env.CONTACT_FORM_BCC_EMAIL ?? '')
      .split(',')
      .map((address) => address.trim())
      .filter(Boolean),
    from:
      env.CONTACT_FORM_FROM_EMAIL ||
      `no-reply@${env.CONTACT_FORM_SEND_EMAIL_DOMAIN}`,
    altchaSecret:
      env.ALTCHA_HMAC_SECRET ||
      createHmac('sha256', env.SMTP_PASSWORD!)
        .update('altcha-contact-form')
        .digest('hex'),
  };
}
