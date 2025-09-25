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
    // CSS Performance Optimizations
    cssChunking: 'strict', // Améliore l'ordre d'import pour chunking optimal
    inlineCss: true, // Inline CSS critique dans <head> pour réduire render blocking
    // useLightningcss: true, // Disabled - conflicts with PostCSS plugins
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
      // Prevent indexing of Vercel domains (Official Vercel 2025 solution)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '.*\\.vercel\\.app$',
          },
        ],
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
      },
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
