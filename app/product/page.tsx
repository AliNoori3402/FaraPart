// app/product/page.tsx
import React, { Suspense } from "react";
import ProductPageClient from "./[id]/components/pageclient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <div className="text-[#1C2024] font-yekanRegular mt-2">
            در حال بارگذاری محصولات...
          </div>
        </div>
      }
    >
      <ProductPageClient />
    </Suspense>
  );
}
