import nodemailer from 'nodemailer';

import { company } from '@/constants/company';

import type { ContactConfig } from './config';
import type { RenderedEmail } from './emails';

type Address = { name: string; address: string };

export interface OutgoingMail extends RenderedEmail {
  to: Address | string;
  replyTo: Address | string;
  bcc?: string[];
  autoReply?: boolean;
}

export function createMailer(config: ContactConfig) {
  const { smtp } = config;
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
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
  const bounceTo = smtp.user.includes('@') ? smtp.user : config.from;

  return {
    async send(mail: OutgoingMail) {
      const to = typeof mail.to === 'string' ? mail.to : mail.to.address;
      const bcc = mail.bcc?.length ? mail.bcc : undefined;
      return transporter.sendMail({
        from,
        to: mail.to,
        bcc,
        replyTo: mail.replyTo,
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
        envelope: { from: bounceTo, to: bcc ? [to, ...bcc] : to },
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
