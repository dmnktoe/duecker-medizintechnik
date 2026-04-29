describe('assertDirectusEnv', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('throws during a production build when NEXT_PUBLIC_DIRECTUS_URL is missing', async () => {
    process.env.NODE_ENV = 'production';
    process.env.NEXT_PHASE = 'phase-production-build';
    delete process.env.NEXT_PUBLIC_DIRECTUS_URL;
    delete process.env.DIRECTUS_API_TOKEN;
    delete process.env.JEST_WORKER_ID;
    delete process.env.npm_lifecycle_event;

    const { assertDirectusEnv } = await import('@/lib/env-assertions');
    expect(() => assertDirectusEnv()).toThrow(
      /Missing required environment variables/,
    );
  });

  it('does not throw during a production build when all required vars are set', async () => {
    process.env.NODE_ENV = 'production';
    process.env.NEXT_PHASE = 'phase-production-build';
    process.env.NEXT_PUBLIC_DIRECTUS_URL = 'https://example.com';
    process.env.DIRECTUS_API_TOKEN = 'token';
    process.env.DIRECTUS_PREVIEW_SECRET = 'secret';
    delete process.env.JEST_WORKER_ID;
    delete process.env.npm_lifecycle_event;

    const { assertDirectusEnv } = await import('@/lib/env-assertions');
    expect(() => assertDirectusEnv()).not.toThrow();
  });

  it('only warns (does not throw) in development', async () => {
    process.env.NODE_ENV = 'development';
    delete process.env.NEXT_PHASE;
    delete process.env.NEXT_PUBLIC_DIRECTUS_URL;
    delete process.env.DIRECTUS_API_TOKEN;
    delete process.env.JEST_WORKER_ID;
    delete process.env.npm_lifecycle_event;

    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { assertDirectusEnv } = await import('@/lib/env-assertions');
    expect(() => assertDirectusEnv()).not.toThrow();
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it('is a no-op when running tests', async () => {
    process.env.NODE_ENV = 'test';
    delete process.env.NEXT_PUBLIC_DIRECTUS_URL;
    delete process.env.DIRECTUS_API_TOKEN;

    const { assertDirectusEnv } = await import('@/lib/env-assertions');
    expect(() => assertDirectusEnv()).not.toThrow();
  });
});
