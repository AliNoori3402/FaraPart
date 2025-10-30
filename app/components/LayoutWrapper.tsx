"use client";

import { usePathname } from "next/navigation";
import Header from "./header/header";
import Footer from "./footer/footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const noHeaderFooterRoutes = [
    "/login-rigister",
    "/personal-information",
    "/verify-code",
  ];

  const headerOnlyRoutes = ["/basket", "/Receipt"]; // ← مسیرهایی که فقط Header دارن

  const showNothing = noHeaderFooterRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const showHeaderOnly = headerOnlyRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <>
      {!showNothing && <Header />}
      <main className="bg-[#FCFCFD]">{children}</main>
      <div className="bg-[#FCFCFD]">
        {!showNothing && !showHeaderOnly && <Footer />}
      </div>
    </>
  );
}
