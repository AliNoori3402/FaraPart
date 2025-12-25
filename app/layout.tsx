import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "./components/LayoutWrapper";
import { Toaster } from "sonner"; // 🆕 اضافه شد

export const metadata: Metadata = {
  title: "فراپارت | فروشگاه آنلاین لوازم یدکی خودرو",
  description:
    "فراپارت؛ مرجع تخصصی خرید آنلاین لوازم یدکی خودرو با ضمانت اصل بودن کالا و ارسال سریع. قطعات موتور، بدنه، جلوبندی، فیلترها، روغن و انواع برندهای معتبر.",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "48x48", type: "image/png" }, // گوگل
      { url: "/banner/222-01.svg", type: "image/svg+xml" }, // سایت
    ],
  },
  openGraph: {
    title: "فراپارت | فروشگاه آنلاین لوازم یدکی خودرو",
    description:
      "خرید مطمئن لوازم یدکی خودرو با ضمانت اصالت و ارسال سریع از فروشگاه فراپارت.",
    images: ["/banner/222-01.svg"], // بهتره یه og-image جدا هم بزاری
    url: "https://farapartco.com", // اگر دامنه داری وارد کن
    siteName: "فراپارت",
    locale: "fa_IR",
    type: "website",
  },
};

export default function RootLayout({
  children,
  headerOnly,
}: {
  children: React.ReactNode;
  headerOnly: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body suppressHydrationWarning>
        {/* صفحات عادی */}
        <LayoutWrapper>{children}</LayoutWrapper>

        <Toaster
          position="top-center"
          richColors
          closeButton
          dir="rtl"
          toastOptions={{
            style: {
              fontFamily: "yekanRegular, sans-serif",
            },
          }}
        />
      </body>
    </html>
  );
}
