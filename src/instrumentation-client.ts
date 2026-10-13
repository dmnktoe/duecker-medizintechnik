// Initializes Sentry in the browser. Next.js loads this file before the app
// becomes interactive.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

import packageJson from '/package.json';

Sentry.init({
  dsn: 'https://65f5a4b32dec025660814ac1469ba53a@o4506781842145280.ingest.us.sentry.io/4507729952833536',
  environment: process.env.NODE_ENV,
  release: packageJson.version,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
