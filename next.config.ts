/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ فعال کردن حالت strict برای بهینه‌تر شدن عملکرد
  reactStrictMode: true,

  // ✅ چشم‌پوشی از خطاهای TypeScript هنگام بیلد
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ چشم‌پوشی از خطاهای ESLint هنگام بیلد
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ پشتیبانی از تصاویر remote (مثلاً از isaco.ir)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "isaco.ir",
        pathname: "/**", // شامل تمام مسیرهای زیر این دامنه
      },
      {
        protocol: "https",
        hostname: "cdn.isaco.ir", // اگر دامنه CDN جدا داری
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.isaco.ir", // در صورت داشتن دامنه دیگر
        pathname: "/**",
      },
    ],
    // ✅ در صورت نیاز می‌تونی سایزهای پیش‌فرض رو محدود یا افزایش بدی
    deviceSizes: [360, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96],
    formats: ["image/avif", "image/webp"],
  },

  // ✅ تنظیمات سازگاری با SSR
  experimental: {
    serverActions: {},
  },

  // ✅ Tailwind و PostCSS به طور خودکار توسط Next پشتیبانی می‌شن
};

module.exports = nextConfig;
