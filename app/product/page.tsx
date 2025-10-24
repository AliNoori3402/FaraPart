// app/product/page.tsx
import React, { Suspense } from "react";
import ProductPageClient from "./[id]/components/pageclient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductPageClient />
    </Suspense>
  );
}
