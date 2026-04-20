/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require('@sentry/nextjs');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** Sentry webpack/babel hooks in `next dev` can leave stale vendor-chunk refs after HMR (MODULE_NOT_FOUND in static-paths-worker). Keep them for production builds only. */
const sentryBuildTime = process.env.NODE_ENV === 'production';

const nextConfig = {
  trailingSlash: true,
  reactStrictMode: false,

  images: {
    qualities: [65, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.duecker-medizintechnik.de',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = withNextIntl(nextConfig);

module.exports = withBundleAnalyzer(module.exports);

module.exports = withSentryConfig(module.exports, {
  org: 'yl33ly',
  project: 'duecker-medizintechnik',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: {
    enabled: sentryBuildTime,
  },
  autoInstrumentServerFunctions: sentryBuildTime,
  autoInstrumentMiddleware: sentryBuildTime,
  autoInstrumentAppDirectory: sentryBuildTime,
  sourcemaps: {
    disable: !sentryBuildTime,
  },
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
