import { Suspense } from "react";

import Loader from "@/components/Loader";
import PaymentClient from "@/components/PaymentClient";

export default function PaymentPage() {
  return (
    <main className="container py-10">
      <Suspense fallback={<Loader text="Loading payment details..." />}>
        <PaymentClient />
      </Suspense>
    </main>
  );
}