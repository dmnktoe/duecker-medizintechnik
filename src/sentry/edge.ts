import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://65f5a4b32dec025660814ac1469ba53a@o4506781842145280.ingest.us.sentry.io/4507729952833536',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});

