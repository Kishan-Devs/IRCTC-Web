"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  Ticket,
  Train as TrainIcon,
  CalendarDays,
  User,
  CheckCircle2,
  Clock3,
  AlertCircle,
  Loader2,
} from "lucide-react";

import Button from "@/components/Button";
import { Booking } from "@/types/booking";
import { formatCurrency } from "@/lib/utils";

type Status = "idle" | "searching" | "found" | "not-found";

export default function BookingLookup() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [pnrInput, setPnrInput] = useState(
    searchParams.get("pnr")?.toUpperCase() ?? ""
  );
  const [status, setStatus] = useState<Status>("idle");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState("");

  const searchBooking = async (pnr: string) => {
    const trimmed = pnr.trim().toUpperCase();

    if (!trimmed) {
      setError("Please enter a PNR number.");
      return;
    }

    setError("");
    setStatus("searching");

    try {
      const raw = localStorage.getItem("bookings");
      const bookings: Booking[] = raw ? JSON.parse(raw) : [];

      // small delay so the searching state is visible
      await new Promise((res) => setTimeout(res, 350));

      const match = bookings.find(
        (b) => b.pnr?.toUpperCase() === trimmed
      );

      if (match) {
        setBooking(match);
        setStatus("found");
        router.replace(`/bookings?pnr=${trimmed}`, { scroll: false });
      } else {
        setBooking(null);
        setStatus("not-found");
      }
    } catch (err) {
      console.error("Failed to look up booking:", err);
      setBooking(null);
      setStatus("not-found");
    }
  };

  // auto-search if a pnr came in via the URL
  useEffect(() => {
    const initial = searchParams.get("pnr");
    if (initial) {
      searchBooking(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchBooking(pnrInput);
  };

  return (
    <div className="mx-auto max-w-xl">
      {/* Search Bar */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-2xl border border-white/40 bg-white/70 p-4 shadow-sm backdrop-blur-xl sm:flex-row sm:items-center sm:p-5"
      >
        <div className="relative flex-1">
          <Ticket className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            value={pnrInput}
            onChange={(e) => {
              setPnrInput(e.target.value.toUpperCase());
              setError("");
            }}
            placeholder="e.g. PNR12345678"
            className={`w-full rounded-xl border py-3 pl-9 pr-3 text-sm uppercase tracking-wide outline-none transition focus:ring-2 ${
              error
                ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
            }`}
          />
        </div>

        <Button
          type="submit"
          disabled={status === "searching"}
          className="h-12 sm:w-auto"
        >
          {status === "searching" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Search
            </>
          )}
        </Button>
      </form>

      {error && (
        <p className="mt-2 flex items-center gap-1 text-sm text-red-500">
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </p>
      )}

      {/* Not Found */}
      {status === "not-found" && (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-8 text-center backdrop-blur-sm">
          <div className="rounded-full bg-amber-100 p-3">
            <AlertCircle className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">
              No booking found
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              We couldn't find a booking with that PNR. Please check the
              number and try again.
            </p>
          </div>
        </div>
      )}

      {/* Found */}
      {status === "found" && booking && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/40 bg-white/70 shadow-sm backdrop-blur-xl">
          {/* Status banner */}
          <div
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium ${
              booking.status === "confirmed"
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {booking.status === "confirmed" ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Confirmed
              </>
            ) : (
              <>
                <Clock3 className="h-4 w-4" />
                Payment Pending
              </>
            )}

            <span className="ml-auto font-mono text-xs tracking-wide">
              {booking.pnr}
            </span>
          </div>

          <div className="space-y-5 p-5 sm:p-6">
            {/* Train Info */}
            <div className="flex items-center gap-3 border-b border-slate-200/60 pb-4">
              <div className="rounded-xl bg-blue-100 p-2.5">
                <TrainIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="min-w-0">
                <h2 className="truncate font-bold text-slate-800">
                  {booking.trainName}
                </h2>
                <p className="text-xs text-slate-500">
                  {booking.trainNumber} • {booking.from} → {booking.to}
                </p>
              </div>
            </div>

            {/* Journey + Fare */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="flex items-center gap-1.5 text-slate-500">
                  <CalendarDays className="h-3.5 w-3.5 text-blue-600" />
                  Journey Date
                </p>
                <p className="mt-1 font-semibold text-slate-800">
                  {booking.journeyDate}
                </p>
              </div>

              <div className="text-right">
                <p className="text-slate-500">Total Fare</p>
                <p className="mt-1 font-bold text-blue-600">
                  {formatCurrency(booking.totalFare)}
                </p>
              </div>
            </div>

            {/* Passengers */}
            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">
                Passengers ({booking.passengers.length})
              </p>

              <div className="space-y-2">
                {booking.passengers.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5 text-slate-400" />
                      <span className="font-medium text-slate-700">
                        {p.name}
                      </span>
                    </div>
                    <span className="text-slate-500">
                      {p.age} yrs • {p.gender}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}