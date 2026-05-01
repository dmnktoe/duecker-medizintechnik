export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry/server');
    const { assertDirectusEnv } = await import('@/lib/env-assertions');
    assertDirectusEnv();
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry/edge');
  }
}
