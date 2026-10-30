import { z } from 'zod';

/**
 * Shared contact form rules. The browser and the API route validate against
 * the same schema, so the two can never drift apart.
 *
 * Error messages are i18n keys (relative to `contact.content.contactForm`),
 * which the client translates and the server returns as-is.
 */

export const CONTACT_TOPICS = [
  'repair',
  'products',
  'manufacturing',
  'other',
] as const;
export type ContactTopic = (typeof CONTACT_TOPICS)[number];

export const CONTACT_LOCALES = ['de', 'en'] as const;
export type ContactLocale = (typeof CONTACT_LOCALES)[number];

export const LIMITS = {
  name: { min: 2, max: 100 },
  company: { max: 120 },
  email: { max: 254 },
  phone: { max: 40 },
  message: { min: 10, max: 5000 },
} as const;

// Links in the name or company field are a strong spam signal, and both
// fields are echoed in the confirmation mail, so we refuse them outright.
const NO_LINKS = /^(?![\s\S]*(?:https?:\/\/|www\.|<|>))[\s\S]*$/i;
const PHONE = /^[+()\d\s./-]*$/;

const trimmed = () => z.string().trim();

export const contactFieldsSchema = z.object({
  name: trimmed()
    .min(LIMITS.name.min, 'name.error.required')
    .max(LIMITS.name.max, 'name.error.maxLength')
    .regex(NO_LINKS, 'name.error.invalid'),
  company: trimmed()
    .max(LIMITS.company.max, 'company.error.maxLength')
    .regex(NO_LINKS, 'company.error.invalid'),
  email: trimmed()
    .min(1, 'email.error.required')
    .max(LIMITS.email.max, 'email.error.invalid')
    .pipe(z.email('email.error.invalid')),
  phone: trimmed()
    .max(LIMITS.phone.max, 'phone.error.invalid')
    .regex(PHONE, 'phone.error.invalid'),
  topic: z.enum(CONTACT_TOPICS, 'topic.error.required'),
  message: trimmed()
    .min(LIMITS.message.min, 'message.error.minLength')
    .max(LIMITS.message.max, 'message.error.maxLength'),
});

export type ContactFields = z.infer<typeof contactFieldsSchema>;
export type ContactFieldName = keyof ContactFields;

/** What the browser posts to `/api/form/`. */
export const contactRequestSchema = contactFieldsSchema.extend({
  locale: z.enum(CONTACT_LOCALES).catch('de'),
  /** ALTCHA proof-of-work payload (base64 JSON). */
  altcha: z.string().min(1).max(10_000),
  /** Honeypot: real people never see or fill this field. */
  website: z.string().max(500).optional().default(''),
});

export type ContactRequest = z.infer<typeof contactRequestSchema>;

/** Machine-readable error codes returned by the API. */
export type ContactErrorCode =
  | 'invalid_request'
  | 'validation_failed'
  | 'captcha_failed'
  | 'rate_limited'
  | 'send_failed'
  | 'not_configured';

export type ContactApiResponse =
  | { ok: true; reference: string }
  | {
      ok: false;
      error: ContactErrorCode;
      fields?: Partial<Record<ContactFieldName, string>>;
    };
