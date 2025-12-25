/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "farapartco.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "isaco.ir",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.isaco.ir",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.isaco.ir",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "trustseal.enamad.ir",
        pathname: "/**",
      },
    ],
    deviceSizes: [360, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96],
    formats: ["image/avif", "image/webp"],
  },

  experimental: {
    serverActions: {},
  },
};

module.exports = nextConfig;
