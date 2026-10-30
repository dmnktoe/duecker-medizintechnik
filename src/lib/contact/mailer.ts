import nodemailer from 'nodemailer';

import { company } from '@/constants/company';

import type { ContactConfig } from './config';
import type { RenderedEmail } from './emails';

type Address = { name: string; address: string };

export interface OutgoingMail extends RenderedEmail {
  to: Address | string;
  replyTo: Address | string;
  /** Marks automatic replies so mail servers don't answer them in a loop. */
  autoReply?: boolean;
}

export function createMailer(config: ContactConfig) {
  const { smtp } = config;
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    // 465 = implicit TLS; anything else must upgrade via STARTTLS.
    secure: smtp.port === 465,
    requireTLS: smtp.port !== 465,
    auth: { user: smtp.user, pass: smtp.password },
    tls: { rejectUnauthorized: smtp.rejectUnauthorized },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  const from: Address = {
    name: `${company.companyName} Website`,
    address: config.from,
  };
  // Bounces go to the real SMTP mailbox, where someone can see them,
  // instead of the unattended no-reply address.
  const bounceTo = smtp.user.includes('@') ? smtp.user : config.from;

  return {
    async send(mail: OutgoingMail) {
      const to = typeof mail.to === 'string' ? mail.to : mail.to.address;
      return transporter.sendMail({
        from,
        to: mail.to,
        replyTo: mail.replyTo,
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
        envelope: { from: bounceTo, to },
        headers: mail.autoReply
          ? {
              'Auto-Submitted': 'auto-replied',
              'X-Auto-Response-Suppress': 'All',
            }
          : undefined,
      });
    },
  };
}
