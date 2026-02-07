/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['@supabase/supabase-js', 'next-intl']
  }
}

module.exports = nextConfig
