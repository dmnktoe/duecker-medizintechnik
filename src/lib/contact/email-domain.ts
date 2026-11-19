import { Resolver } from 'node:dns/promises';

export type EmailDomainStatus = 'ok' | 'invalid' | 'unknown';

const NO_RECORDS = new Set(['ENOTFOUND', 'ENODATA']);

function errorCode(err: unknown) {
  return (err as NodeJS.ErrnoException | undefined)?.code ?? '';
}

function domainOf(email: string) {
  return email.slice(email.lastIndexOf('@') + 1).toLowerCase();
}

async function hasAddress(resolver: Resolver, domain: string) {
  const lookups = await Promise.allSettled([
    resolver.resolve4(domain),
    resolver.resolve6(domain),
  ]);
  if (lookups.some((r) => r.status === 'fulfilled' && r.value.length > 0)) {
    return true;
  }
  if (
    lookups.some(
      (r) => r.status === 'rejected' && !NO_RECORDS.has(errorCode(r.reason)),
    )
  ) {
    throw new Error('dns_unavailable');
  }
  return false;
}

async function lookupDomain(
  resolver: Resolver,
  domain: string,
): Promise<EmailDomainStatus> {
  if (!domain) return 'invalid';

  try {
    const hosts = (await resolver.resolveMx(domain)).map((r) =>
      r.exchange.replace(/\.$/, ''),
    );
    if (hosts.length > 0) {
      return hosts.every((host) => host === '') ? 'invalid' : 'ok';
    }
  } catch (err) {
    if (!NO_RECORDS.has(errorCode(err))) return 'unknown';
  }

  try {
    return (await hasAddress(resolver, domain)) ? 'ok' : 'invalid';
  } catch {
    return 'unknown';
  }
}

export async function checkEmailDomain(
  email: string,
  {
    knownGood,
    resolver = new Resolver({ timeout: 2_000, tries: 2 }),
  }: { knownGood: string; resolver?: Resolver },
): Promise<EmailDomainStatus> {
  const status = await lookupDomain(resolver, domainOf(email));
  if (status !== 'invalid') return status;

  const control = await lookupDomain(resolver, domainOf(knownGood));
  return control === 'ok' ? 'invalid' : 'unknown';
}
