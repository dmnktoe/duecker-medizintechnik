import {
  delay,
  getFromLocalStorage,
  getFromSessionStorage,
  openGraph,
} from '@/lib/helper';

describe('Open Graph function should work correctly', () => {
  it('should not return templateTitle when not specified', () => {
    const result = openGraph({
      description: 'Test description',
      siteName: 'Test site name',
    });
    expect(result).not.toContain('templateTitle=');
    expect(new URL(result).searchParams.get('title')).toBe('Test site name');
  });

  it('should use templateTitle as og title when specified', () => {
    const result = openGraph({
      templateTitle: 'Test Template Title',
      description: 'Test description',
      siteName: 'Test site name',
    });
    expect(new URL(result).searchParams.get('title')).toBe(
      'Test Template Title',
    );
    expect(new URL(result).searchParams.get('description')).toBe(
      'Test description',
    );
  });
});

describe('getFromLocalStorage', () => {
  it('should return the value from local storage if it exists', () => {
    const key = 'testKey';
    const value = 'testValue';
    window.localStorage.setItem(key, value);

    expect(getFromLocalStorage(key)).toBe(value);
  });

  it('should return null if the value does not exist in local storage', () => {
    const key = 'nonExistentKey';
    window.localStorage.removeItem(key);

    expect(getFromLocalStorage(key)).toBeNull();
  });
});

describe('getFromSessionStorage', () => {
  it('should return the value from session storage if it exists', () => {
    const key = 'testKey';
    const value = 'testValue';
    sessionStorage.setItem(key, value);

    expect(getFromSessionStorage(key)).toBe(value);
  });

  it('should return null if the value does not exist in session storage', () => {
    const key = 'nonExistentKey';
    sessionStorage.removeItem(key);

    expect(getFromSessionStorage(key)).toBeNull();
  });
});

describe('delay', () => {
  jest.useFakeTimers();

  it('should resolve with the value after the specified time', async () => {
    const time = 1000;
    const value = 1;

    const promise = delay(time);
    jest.advanceTimersByTime(time);

    const result = await promise;
    expect(result).toBe(value);
  });
});
