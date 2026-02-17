import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/shared/config/i18n-request.ts');

const nextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  images: {
    unoptimized: true,
  },
  transpilePackages: ['framer-motion'],
};

export default withNextIntl(nextConfig);
