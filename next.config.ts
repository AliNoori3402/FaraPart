/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // خطاهای ESLint (مثل img یا unused vars) بیلد رو متوقف نمی‌کنه
    ignoreDuringBuilds: true,
  },
  typescript: {
    // خطاهای TypeScript (مثل any یا ارور تایپ) بیلد رو متوقف نمی‌کنه
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["localhost", "isaco.liara.run"], // اگر تصاویر از API یا دامنه دیگه لود می‌شن
  },
};

module.exports = nextConfig;
