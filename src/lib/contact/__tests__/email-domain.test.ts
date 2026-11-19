/**
 * @jest-environment node
 */

import type { Resolver } from 'node:dns/promises';

import { checkEmailDomain } from '../email-domain';

function dnsError(code: string) {
  return Object.assign(new Error(code), { code });
}

type Records = {
  mx: { exchange: string; priority: number }[] | Error;
  a?: string[] | Error;
  aaaa?: string[] | Error;
};

const GOOD: Records = { mx: [{ exchange: 'mx.inbox.test', priority: 10 }] };

function fakeResolver(records: Records, control: Records = GOOD) {
  const answer =
    (key: keyof Records) =>
    (domain: string): Promise<unknown> => {
      const set = domain === 'inbox.test' ? control : records;
      const value = set[key] ?? dnsError('ENODATA');
      return value instanceof Error
        ? Promise.reject(value)
        : Promise.resolve(value);
    };
  return {
    resolveMx: jest.fn(answer('mx')),
    resolve4: jest.fn(answer('a')),
    resolve6: jest.fn(answer('aaaa')),
  } as unknown as Resolver;
}

const check = (email: string, resolver: Resolver) =>
  checkEmailDomain(email, { knownGood: 'team@inbox.test', resolver });

describe('checkEmailDomain', () => {
  it('accepts a domain with MX records', async () => {
    const resolver = fakeResolver({
      mx: [{ exchange: 'mx.example.com', priority: 10 }],
    });
    await expect(check('a@Example.com', resolver)).resolves.toBe('ok');
    expect(resolver.resolveMx).toHaveBeenCalledWith('example.com');
  });

  it('rejects a domain that does not exist', async () => {
    const resolver = fakeResolver({
      mx: dnsError('ENOTFOUND'),
      a: dnsError('ENOTFOUND'),
      aaaa: dnsError('ENOTFOUND'),
    });
    await expect(check('a@ss-fastner.com', resolver)).resolves.toBe('invalid');
  });

  it('rejects a null MX', async () => {
    const resolver = fakeResolver({
      mx: [{ exchange: '', priority: 0 }],
      a: ['192.0.2.1'],
    });
    await expect(check('a@example.com', resolver)).resolves.toBe('invalid');
  });

  it('falls back to an address record without MX', async () => {
    const resolver = fakeResolver({
      mx: dnsError('ENODATA'),
      a: ['192.0.2.1'],
    });
    await expect(check('a@example.com', resolver)).resolves.toBe('ok');
  });

  it('rejects a domain without MX or address records', async () => {
    const resolver = fakeResolver({ mx: dnsError('ENODATA') });
    await expect(check('a@example.com', resolver)).resolves.toBe('invalid');
  });

  it('returns unknown when DNS cannot resolve our own domain either', async () => {
    const broken: Records = { mx: dnsError('ENODATA') };
    await expect(
      check('a@gmail.com', fakeResolver(broken, broken)),
    ).resolves.toBe('unknown');
  });

  it('returns unknown when DNS is unavailable', async () => {
    await expect(
      check('a@example.com', fakeResolver({ mx: dnsError('ETIMEOUT') })),
    ).resolves.toBe('unknown');
    await expect(
      check(
        'a@example.com',
        fakeResolver({ mx: dnsError('ENODATA'), a: dnsError('ESERVFAIL') }),
      ),
    ).resolves.toBe('unknown');
  });
});
