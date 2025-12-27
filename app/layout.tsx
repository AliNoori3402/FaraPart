import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "./components/LayoutWrapper";
import { Toaster } from "sonner"; // 🆕 اضافه شد

export const metadata: Metadata = {
  title: "فراپارت | فروشگاه آنلاین لوازم یدکی خودرو",
  description:
    "فراپارت؛ مرجع تخصصی خرید آنلاین لوازم یدکی خودرو با ضمانت اصل بودن کالا و ارسال سریع.",

  openGraph: {
    title: "فراپارت | فروشگاه آنلاین لوازم یدکی خودرو",
    description: "خرید مطمئن لوازم یدکی خودرو با ضمانت اصالت و ارسال سریع",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    url: "https://farapartco.com",
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
