import { randomBytes } from 'crypto';

/** Short, readable ID that appears in both mails, e.g. DM-261030-7KQ2. */
export function createReference(now = new Date()) {
  const date = now.toISOString().slice(2, 10).replace(/-/g, '');
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const suffix = Array.from(randomBytes(4), (b) => alphabet[b % 32]).join('');
  return `DM-${date}-${suffix}`;
}
