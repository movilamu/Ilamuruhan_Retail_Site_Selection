import { withSentryConfig } from '@sentry/nextjs'

const API_BASE = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      { source: '/score', destination: `${API_BASE}/score` },
      { source: '/export', destination: `${API_BASE}/export` },
      { source: '/sites', destination: `${API_BASE}/sites` },
      { source: '/sites/:path*', destination: `${API_BASE}/sites/:path*` },
      { source: '/scenarios', destination: `${API_BASE}/scenarios` },
      { source: '/scenarios/:path*', destination: `${API_BASE}/scenarios/:path*` },
      { source: '/sensitivity/:path*', destination: `${API_BASE}/sensitivity/:path*` },
      { source: '/elicitation/:path*', destination: `${API_BASE}/elicitation/:path*` },
    ]
  },
}

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "k-1a",

  project: "retail-site-frontend",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
