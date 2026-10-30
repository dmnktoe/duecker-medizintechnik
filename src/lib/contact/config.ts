import { createHmac } from 'crypto';

export interface ContactConfig {
  smtp: {
    host: string;
    port: number;
    user: string;
    password: string;
    rejectUnauthorized: boolean;
  };
  /** Mailbox that receives new enquiries. */
  inbox: string;
  /** Address the website sends from (must be allowed by SPF/DKIM). */
  from: string;
  /** Secret used to sign ALTCHA challenges. */
  altchaSecret: string;
}

export class ContactConfigError extends Error {
  constructor(missing: string[]) {
    super(`Contact form is missing env vars: ${missing.join(', ')}`);
    this.name = 'ContactConfigError';
  }
}

/**
 * Reads and checks all contact form settings. Throws a ContactConfigError
 * naming every missing variable, so a broken deploy shows up in Sentry
 * instead of silently dropping enquiries.
 */
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
  if (missing.length > 0) throw new ContactConfigError(missing);

  return {
    smtp: {
      host: env.SMTP_HOST!,
      port,
      user: env.SMTP_USER!,
      password: env.SMTP_PASSWORD!,
      rejectUnauthorized: env.SMTP_TLS_REJECT_UNAUTHORIZED !== 'false',
    },
    inbox: env.CONTACT_FORM_RECEIVE_EMAIL!,
    from:
      env.CONTACT_FORM_FROM_EMAIL ||
      `no-reply@${env.CONTACT_FORM_SEND_EMAIL_DOMAIN}`,
    // A dedicated secret is preferred. Without one we derive a stable key from
    // the SMTP password, which is server-only and always set when mail works.
    altchaSecret:
      env.ALTCHA_HMAC_SECRET ||
      createHmac('sha256', env.SMTP_PASSWORD!)
        .update('altcha-contact-form')
        .digest('hex'),
  };
}
