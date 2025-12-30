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
        hostname: "farapartco.ir", // ← اضافه شد (مهم)
        pathname: "/**",
      },
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
  },

  experimental: {
    serverActions: {},
  },
};

module.exports = nextConfig;
