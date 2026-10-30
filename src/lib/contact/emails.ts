import { company } from '@/constants/company';

import type { ContactFields, ContactLocale, ContactTopic } from './schema';

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

const TOPIC_LABELS: Record<ContactLocale, Record<ContactTopic, string>> = {
  de: {
    repair: 'Reparatur & Service',
    products: 'Produkte & Vertrieb',
    manufacturing: 'Herstellung & Schlauchsysteme',
    other: 'Sonstiges',
  },
  en: {
    repair: 'Repair & service',
    products: 'Products & distribution',
    manufacturing: 'Manufacturing & tubing systems',
    other: 'Other',
  },
};

export function topicLabel(topic: ContactTopic, locale: ContactLocale) {
  return TOPIC_LABELS[locale][topic];
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const multiline = (value: string) => escapeHtml(value).replace(/\n/g, '<br />');

function layout(lang: string, title: string, body: string) {
  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:24px;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#081626;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e7e7e7;border-radius:8px;">
      <tr><td style="height:4px;background:${company.primaryHex};border-radius:8px 8px 0 0;"></td></tr>
      <tr><td style="padding:24px 28px;font-size:15px;line-height:1.55;">${body}</td></tr>
    </table>
  </body>
</html>`;
}

function row(label: string, value: string) {
  return `<tr>
  <td style="padding:6px 12px 6px 0;vertical-align:top;color:#5b6675;white-space:nowrap;">${escapeHtml(label)}</td>
  <td style="padding:6px 0;vertical-align:top;">${value}</td>
</tr>`;
}

/** Notification for the Dücker team. Always German. */
export function renderInternalEmail(
  fields: ContactFields,
  meta: { reference: string; locale: ContactLocale; receivedAt: Date },
): RenderedEmail {
  const topic = topicLabel(fields.topic, 'de');
  const when = meta.receivedAt.toLocaleString('de-DE', {
    timeZone: 'Europe/Berlin',
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const dash = '–';
  const subject = `Kontaktanfrage: ${topic} – ${fields.name} [${meta.reference}]`;

  const html = layout(
    'de',
    subject,
    `<h1 style="margin:0 0 4px;font-size:20px;">Neue Kontaktanfrage</h1>
<p style="margin:0 0 20px;color:#5b6675;font-size:13px;">${escapeHtml(when)} · Referenz ${escapeHtml(meta.reference)} · Sprache: ${meta.locale.toUpperCase()}</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="font-size:15px;">
  ${row('Thema', escapeHtml(topic))}
  ${row('Name', escapeHtml(fields.name))}
  ${row('Firma', escapeHtml(fields.company || dash))}
  ${row('E-Mail', `<a href="mailto:${escapeHtml(fields.email)}" style="color:${company.primaryHex};">${escapeHtml(fields.email)}</a>`)}
  ${row('Telefon', fields.phone ? `<a href="tel:${escapeHtml(fields.phone.replace(/[^\d+]/g, ''))}" style="color:${company.primaryHex};">${escapeHtml(fields.phone)}</a>` : dash)}
</table>
<h2 style="margin:24px 0 8px;font-size:16px;">Nachricht</h2>
<div style="padding:14px 16px;background:#f4f6f8;border-radius:6px;white-space:normal;">${multiline(fields.message)}</div>
<p style="margin:24px 0 0;font-size:13px;color:#5b6675;">Einfach auf diese E-Mail antworten – die Antwort geht direkt an ${escapeHtml(fields.name)}. Der Absender hat eine automatische Eingangsbestätigung erhalten.</p>`,
  );

  const text = [
    'Neue Kontaktanfrage',
    `${when} · Referenz ${meta.reference} · Sprache: ${meta.locale.toUpperCase()}`,
    '',
    `Thema:   ${topic}`,
    `Name:    ${fields.name}`,
    `Firma:   ${fields.company || dash}`,
    `E-Mail:  ${fields.email}`,
    `Telefon: ${fields.phone || dash}`,
    '',
    'Nachricht:',
    fields.message,
    '',
    `Einfach auf diese E-Mail antworten – die Antwort geht direkt an ${fields.name}.`,
  ].join('\n');

  return { subject, html, text };
}

const CONFIRMATION_COPY = {
  de: {
    subject: (ref: string) =>
      `Ihre Anfrage bei ${company.companyName} [${ref}]`,
    greeting: (name: string) => `Guten Tag ${name},`,
    intro:
      'vielen Dank für Ihre Nachricht. Wir haben Ihre Anfrage erhalten und melden uns in der Regel innerhalb von 1–2 Werktagen bei Ihnen.',
    reference: 'Ihre Referenznummer',
    topic: 'Thema',
    urgent: 'Bei dringenden Anliegen erreichen Sie uns telefonisch unter',
    reply:
      'Sie können direkt auf diese E-Mail antworten, falls Sie noch etwas ergänzen möchten.',
    regards: 'Mit freundlichen Grüßen',
    team: `Ihr Team von ${company.companyName}`,
    notice:
      'Sie erhalten diese automatische Bestätigung, weil über das Kontaktformular auf unserer Website eine Anfrage mit dieser E-Mail-Adresse gesendet wurde. Falls das nicht Sie waren, können Sie diese Nachricht ignorieren.',
  },
  en: {
    subject: (ref: string) => `Your enquiry to ${company.companyName} [${ref}]`,
    greeting: (name: string) => `Dear ${name},`,
    intro:
      'thank you for your message. We have received your enquiry and usually reply within 1–2 business days.',
    reference: 'Your reference number',
    topic: 'Topic',
    urgent: 'For urgent matters, please call us at',
    reply:
      'You can reply directly to this e-mail if you would like to add anything.',
    regards: 'Kind regards',
    team: `The ${company.companyName} team`,
    notice:
      'You are receiving this automatic confirmation because an enquiry was sent with this e-mail address via the contact form on our website. If this was not you, you can ignore this message.',
  },
} as const;

/**
 * Automatic receipt for the visitor. It deliberately does not repeat the
 * message text, so the form can't be abused to send arbitrary content to
 * third-party addresses.
 */
export function renderConfirmationEmail(
  fields: Pick<ContactFields, 'name' | 'topic'>,
  meta: { reference: string; locale: ContactLocale },
): RenderedEmail {
  const c = CONFIRMATION_COPY[meta.locale];
  const topic = topicLabel(fields.topic, meta.locale);
  const subject = c.subject(meta.reference);
  const phoneHref = company.phone.replace(/\(0\)/, '').replace(/[^\d+]/g, '');

  const html = layout(
    meta.locale,
    subject,
    `<p style="margin:0 0 16px;">${escapeHtml(c.greeting(fields.name))}</p>
<p style="margin:0 0 20px;">${escapeHtml(c.intro)}</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 20px;padding:14px 16px;background:#f4f6f8;border-radius:6px;width:100%;">
  ${row(c.reference, `<strong>${escapeHtml(meta.reference)}</strong>`)}
  ${row(c.topic, escapeHtml(topic))}
</table>
<p style="margin:0 0 16px;">${escapeHtml(c.urgent)} <a href="tel:${phoneHref}" style="color:${company.primaryHex};">${escapeHtml(company.phone)}</a>.</p>
<p style="margin:0 0 20px;">${escapeHtml(c.reply)}</p>
<p style="margin:0;">${escapeHtml(c.regards)}<br />${escapeHtml(c.team)}</p>
<hr style="margin:24px 0 16px;border:none;border-top:1px solid #e7e7e7;" />
<p style="margin:0;font-size:12px;color:#5b6675;">${escapeHtml(company.companyName)} · ${escapeHtml(company.street)} · ${escapeHtml(company.city)}<br />${escapeHtml(c.notice)}</p>`,
  );

  const text = [
    c.greeting(fields.name),
    '',
    c.intro,
    '',
    `${c.reference}: ${meta.reference}`,
    `${c.topic}: ${topic}`,
    '',
    `${c.urgent} ${company.phone}.`,
    c.reply,
    '',
    c.regards,
    c.team,
    '',
    '--',
    `${company.companyName} · ${company.street} · ${company.city}`,
    c.notice,
  ].join('\n');

  return { subject, html, text };
}
