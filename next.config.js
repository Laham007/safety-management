/** @type {import('next').NextConfig} */
const nextConfig = {
  // Basic configuration
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  
  // Static export configuration
  output: 'export',
  basePath: '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : undefined,
  trailingSlash: false,
  
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable TypeScript type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Image optimization
  images: {
    unoptimized: true, // Required for static export
    domains: ['localhost'],
  },
  
  // Add this to handle CSS and static assets
  experimental: {
    appDir: true,
  },
  
  // This is important for static exports
  webpack(config) {
    config.module.rules.push({
      test: /\.css$/i,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    });
    return config;
  },
  
  // Skip problematic pages during build
  skipTrailingSlashRedirect: true,
  
  // Disable static optimization for all pages
  outputFileTracing: false,
  
  // Enable static HTML export
  distDir: 'out',
  
  // Disable image optimization API routes
  images: {
    loader: 'imgix',
    path: '/',
  },
};

// For Netlify deployment
if (process.env.NETLIFY === 'true') {
  nextConfig.assetPrefix = '';
  nextConfig.basePath = '';
}

module.exports = nextConfig;
