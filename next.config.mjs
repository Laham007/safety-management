/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ['safety-management.netlify.app'],
  },
  experimental: {
    appDir: true,
  },
  output: 'standalone',
  trailingSlash: true,
};

// For Netlify deployment
const withTM = require('next-transpile-modules')([]);

module.exports = withTM(nextConfig);
