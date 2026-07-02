import { Suspense } from "react";

import Loader from "@/components/Loader";
import BookingLookup from "@/components/BookingLookup";

export default function BookingsPage() {
  return (
    <main className="container py-10">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-800">
          Check Your Booking
        </h1>
        <p className="mt-2 text-slate-600">
          Enter your PNR number to view your booking status and details.
        </p>
      </div>

      <Suspense fallback={<Loader text="Loading..." />}>
        <BookingLookup />
      </Suspense>
    </main>
  );
}