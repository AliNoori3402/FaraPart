import { Suspense } from "react";
import VerifyCodeClient from "./VerifyCodeClient";

export default function Page() {
  return (
    <Suspense fallback={<p>در حال بارگذاری...</p>}>
      <VerifyCodeClient />
    </Suspense>
  );
}
