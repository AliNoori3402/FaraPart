import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // بیلد با ارور ESLint قطع نشه
    ignoreDuringBuilds: true,
  },
  typescript: {
    // بیلد با ارور TypeScript قطع نشه
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
