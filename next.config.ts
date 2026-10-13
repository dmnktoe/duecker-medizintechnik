import createBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs/config';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** Sentry webpack/babel hooks in `next dev` can leave stale vendor-chunk refs after HMR (MODULE_NOT_FOUND in static-paths-worker). Keep them for production builds only. */
const sentryBuildTime = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  trailingSlash: true,
  reactStrictMode: false,

  images: {
    qualities: [65, 90],
    localPatterns: [
      { pathname: '/api/cms/assets/**' },
      { pathname: '/api/cms/assets/**/' },
      // Static files under /public (e.g. /images/...) when using <Image src="/images/...">
      { pathname: '/images/**' },
    ],
    remotePatterns: [
      // Directus media host – derived from NEXT_PUBLIC_DIRECTUS_URL so we
      // don't need to hard-code the hostname in here.
      ...(() => {
        try {
          if (!process.env.NEXT_PUBLIC_DIRECTUS_URL) return [];
          const u = new URL(process.env.NEXT_PUBLIC_DIRECTUS_URL);
          return [
            {
              protocol: u.protocol.replace(':', '') as 'http' | 'https',
              hostname: u.hostname,
            },
          ];
        } catch {
          return [];
        }
      })(),
      {
        protocol: 'https',
        hostname: 'admin.duecker-medizintechnik.de',
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

export default withSentryConfig(withBundleAnalyzer(withNextIntl(nextConfig)), {
  org: 'yl33ly',
  project: 'duecker-medizintechnik',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: {
    enabled: sentryBuildTime,
  },
  sourcemaps: {
    disable: !sentryBuildTime,
  },
  tunnelRoute: '/monitoring',
  webpack: {
    autoInstrumentServerFunctions: sentryBuildTime,
    autoInstrumentMiddleware: sentryBuildTime,
    autoInstrumentAppDirectory: sentryBuildTime,
    automaticVercelMonitors: true,
    treeshake: {
      removeDebugLogging: true,
    },
  },
});
