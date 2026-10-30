import { createChallenge, randomInt } from 'altcha-lib';
import { deriveKey } from 'altcha-lib/algorithms/pbkdf2';
import { CappedMap, create } from 'altcha-lib/frameworks/nextjs';

/**
 * Self-hosted ALTCHA proof-of-work. No cookies, no third parties, so the
 * form works without marketing consent (unlike Google reCAPTCHA).
 *
 * Tuned so a phone solves it in ~1-2 s while the visitor is still typing.
 */
const ALGORITHM = 'PBKDF2/SHA-256';
const COST = 500;
const CHALLENGE_TTL_MS = 30 * 60 * 1000;

// Remembers used challenges per server instance so one solution can't be
// replayed to send many mails.
const usedChallenges = new CappedMap<string, boolean>({ maxSize: 10_000 });

const keySecret = (secret: string) => `${secret}:key`;

// The framework helper exposes the verifier that also handles replay checks.
const { verify } = create({});

export function createContactChallenge(secret: string) {
  return createChallenge({
    algorithm: ALGORITHM,
    cost: COST,
    counter: randomInt(3_000, 6_000),
    deriveKey,
    expiresAt: new Date(Date.now() + CHALLENGE_TTL_MS),
    hmacSignatureSecret: secret,
    hmacKeySignatureSecret: keySecret(secret),
  });
}

export async function verifyContactChallenge(
  payload: string,
  secret: string,
): Promise<{ ok: boolean; reason?: string }> {
  const result = await verify(
    payload,
    deriveKey,
    secret,
    keySecret(secret),
    usedChallenges,
  );
  return result.error ? { ok: false, reason: result.error } : { ok: true };
}
