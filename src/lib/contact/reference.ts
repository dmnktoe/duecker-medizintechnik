import { randomBytes } from 'crypto';

export function createReference(now = new Date()) {
  const date = now.toISOString().slice(2, 10).replace(/-/g, '');
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const suffix = Array.from(randomBytes(4), (b) => alphabet[b % 32]).join('');
  return `DM-${date}-${suffix}`;
}
