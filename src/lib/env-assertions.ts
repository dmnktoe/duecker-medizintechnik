/**
 * Build- and runtime-time assertions for required environment variables.
 *
 * - At build time (e.g. `next build`) we want the build to FAIL if mandatory
 *   CMS configuration is missing. That keeps deploys from silently shipping a
 *   site without working content.
 * - At dev time we don't crash – we log a clear warning so contributors can
 *   set up their `.env.local` without hitting weird runtime errors.
 * - During tests / local lint we are equally tolerant.
 */

const REQUIRED_VARS = [
  'NEXT_PUBLIC_DIRECTUS_URL',
  'DIRECTUS_API_TOKEN',
] as const;

const RECOMMENDED_VARS = ['DIRECTUS_PREVIEW_SECRET'] as const;

type EnvKey =
  | (typeof REQUIRED_VARS)[number]
  | (typeof RECOMMENDED_VARS)[number];

function isRunningJestOrLint(): boolean {
  return (
    process.env.NODE_ENV === 'test' ||
    process.env.JEST_WORKER_ID !== undefined ||
    process.env.npm_lifecycle_event === 'lint' ||
    process.env.npm_lifecycle_event === 'lint:strict' ||
    process.env.npm_lifecycle_event === 'lint:fix' ||
    process.env.npm_lifecycle_event === 'typecheck' ||
    process.env.npm_lifecycle_event === 'test' ||
    process.env.npm_lifecycle_event === 'test:watch' ||
    process.env.npm_lifecycle_event === 'test:coverage'
  );
}

function isProductionBuild(): boolean {
  return (
    process.env.NEXT_PHASE === 'phase-production-build' ||
    (process.env.NODE_ENV === 'production' &&
      process.env.NEXT_PHASE !== 'phase-production-server')
  );
}

function getMissing(keys: readonly EnvKey[]): EnvKey[] {
  return keys.filter((key) => {
    const value = process.env[key];
    return !value || value.trim() === '';
  });
}

let asserted = false;

/**
 * Throws if required Directus env vars are missing during a production build.
 * Safe to import from anywhere; the actual check runs at most once per
 * process.
 */
export function assertDirectusEnv(): void {
  if (asserted) return;
  asserted = true;

  if (isRunningJestOrLint()) return;

  const missingRequired = getMissing(REQUIRED_VARS);
  const missingRecommended = getMissing(RECOMMENDED_VARS);

  if (missingRequired.length > 0) {
    const message = `[directus] Missing required environment variables: ${missingRequired.join(
      ', ',
    )}. Add them to your hosting platform / .env.local before continuing.`;

    if (isProductionBuild()) {
      throw new Error(message);
    }

    // eslint-disable-next-line no-console
    console.warn(message);
  }

  if (missingRecommended.length > 0) {
    // eslint-disable-next-line no-console
    console.warn(
      `[directus] Optional environment variables not set: ${missingRecommended.join(
        ', ',
      )}. Live Preview will not work until they are configured.`,
    );
  }
}
