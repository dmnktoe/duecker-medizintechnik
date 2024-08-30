import { getVersion } from '@/lib/get-version';

import packageJson from '../../../package.json';

describe('getVersion', () => {
  it('returns the correct version from package.json', () => {
    expect(getVersion()).toBe(packageJson.version);
  });

  it('returns a non-empty string', () => {
    const version = getVersion();
    expect(typeof version).toBe('string');
    expect(version.length).toBeGreaterThan(0);
  });
});
