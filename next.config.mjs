/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production-ready configuration
  eslint: {
    // Only ignore ESLint during builds in development
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
  typescript: {
    // Only ignore TypeScript errors during builds in development
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  experimental: {
    // CSS Chunking optimisé pour réduire le blocking CSS
    cssChunking: true, // Active le chunking pour séparer CSS critique/non-critique
  },
  images: {
    // Configuration optimisée pour la qualité d'images
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // SEO Redirects
  async redirects() {
    return [
      {
        source: '/questionnaire',
        destination: '/test-politique-municipal',
        permanent: true, // 301 redirect pour SEO
      },
    ]
  },
  // Security headers for production
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
}

export default nextConfig
