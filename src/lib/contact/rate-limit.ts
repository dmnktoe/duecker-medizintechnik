/**
 * Small in-memory sliding-window rate limiter. It is per server instance,
 * which is enough to stop one client from flooding the inbox; the proof of
 * work makes distributed abuse expensive on top of that.
 */
export function createRateLimiter({
  limit,
  windowMs,
  maxKeys = 5_000,
}: {
  limit: number;
  windowMs: number;
  maxKeys?: number;
}) {
  const hits = new Map<string, number[]>();

  return function check(key: string, now = Date.now()) {
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    const allowed = recent.length < limit;
    if (allowed) recent.push(now);

    hits.delete(key);
    hits.set(key, recent);
    if (hits.size > maxKeys) {
      const oldest = hits.keys().next().value;
      if (oldest !== undefined) hits.delete(oldest);
    }

    const retryAfterMs = allowed ? 0 : windowMs - (now - recent[0]);
    return { allowed, retryAfterSeconds: Math.ceil(retryAfterMs / 1000) };
  };
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return headers.get('x-real-ip')?.trim() || 'unknown';
}
