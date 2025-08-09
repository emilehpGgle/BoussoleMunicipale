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
    // CSS Chunking optimisé pour réduire render blocking
    cssChunking: 'strict', // Charge CSS par route vs chunking global agressif
  },
  images: {
    // Configuration optimisée pour la qualité d'images
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
