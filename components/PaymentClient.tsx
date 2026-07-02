"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  CreditCard,
  Smartphone,
  Lock,
  Loader2,
  Train as TrainIcon,
  Home,
  Ticket,
} from "lucide-react";

import Button from "@/components/Button";
import EmptyState from "@/components/EmptyState";
import { Booking } from "@/types/booking";
import { formatCurrency } from "@/lib/utils";

type PaymentMethod = "card" | "upi";
type Stage = "loading" | "form" | "processing" | "success" | "not-found";

interface CardErrors {
  name?: string;
  number?: string;
  expiry?: string;
  cvv?: string;
}

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function PaymentClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId") ?? "";

  const [stage, setStage] = useState<Stage>("loading");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [pnr, setPnr] = useState("");

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [errors, setErrors] = useState<CardErrors & { upi?: string }>({});

  useEffect(() => {
    if (!bookingId) {
      setStage("not-found");
      return;
    }

    try {
      const raw = localStorage.getItem("bookings");
      const bookings: Booking[] = raw ? JSON.parse(raw) : [];
      const found = bookings.find((b) => b.id === bookingId);

      if (!found) {
        setStage("processing");
        return;
      }

      setBooking(found);
      setStage(found.status === "confirmed" ? "success" : "form");
    } catch (err) {
      console.error("Failed to load booking:", err);
      setStage("not-found");
    }
  }, [bookingId]);

  const validate = (): boolean => {
    const newErrors: CardErrors & { upi?: string } = {};

    if (method === "card") {
      if (!cardName.trim()) newErrors.name = "Name on card is required.";

      const digits = cardNumber.replace(/\s/g, "");
      if (digits.length !== 16) newErrors.number = "Enter a valid 16-digit card number.";

      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        newErrors.expiry = "Use MM/YY format.";
      } else {
        const [mm] = expiry.split("/").map(Number);
        if (mm < 1 || mm > 12) newErrors.expiry = "Invalid month.";
      }

      if (!/^\d{3,4}$/.test(cvv)) newErrors.cvv = "Enter a valid CVV.";
    } else {
      if (!/^[\w.-]+@[\w.-]+$/.test(upiId)) {
        newErrors.upi = "Enter a valid UPI ID (e.g. name@bank).";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking) return;
    if (!validate()) return;

    setStage("processing");

    // simulate a payment gateway round-trip
    await new Promise((res) => setTimeout(res, 1800));

    const generatedPnr = `PNR${Date.now().toString().slice(-8)}`;

    try {
      const raw = localStorage.getItem("bookings");
      const bookings: Booking[] = raw ? JSON.parse(raw) : [];
      const updated = bookings.map((b) =>
        b.id === booking.id
          ? { ...b, status: "confirmed" as const, pnr: generatedPnr }
          : b
      );
       localStorage.setItem("bookings", JSON.stringify(updated));
      setBooking({ ...booking, status: "confirmed", pnr: generatedPnr });
    } catch (err) {
      console.error("Failed to confirm booking:", err);
    }

    setPnr(generatedPnr);
    setStage("success");
  };

  if (stage === "loading") {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      </div>
    );
  }

  if (stage === "not-found" || !booking) {
    return (
      <EmptyState
        title="Booking Not Found"
        description="We couldn't find this booking. Please start your search again."
      />
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-800">
          {stage === "success" ? "Payment Successful" : "Complete Your Payment"}
        </h1>
        {stage !== "success" && (
          <p className="mt-2 text-slate-600">
            You re one step away from confirming your booking.
          </p>
        )}
      </div>

      {/* Booking Summary */}
      <div className="mb-6 rounded-2xl border border-white/40 bg-white/70 p-5 shadow-sm backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-3 border-b border-slate-200/60 pb-4">
          <div className="rounded-xl bg-blue-100 p-2.5">
            <TrainIcon className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">{booking.trainName}</h2>
            <p className="text-xs text-slate-500">
              {booking.from} → {booking.to} • {booking.journeyDate}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">
            {booking.passengers.length} passenger
            {booking.passengers.length > 1 ? "s" : ""}
          </span>
          <span className="text-lg font-bold text-blue-600">
            {formatCurrency(booking.totalFare)}
          </span>
        </div>
      </div>

      {/* Processing */}
      {stage === "processing" && (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/40 bg-white/70 p-10 text-center shadow-sm backdrop-blur-xl">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <div>
            <p className="font-semibold text-slate-800">
              Processing your payment...
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Please don't close or refresh this page.
            </p>
          </div>
        </div>
      )}

      {/* Payment Form */}
      {stage === "form" && (
        <form
          onSubmit={handlePay}
          className="space-y-5 rounded-2xl border border-white/40 bg-white/70 p-5 shadow-sm backdrop-blur-xl sm:p-6"
        >
          {/* Method Tabs */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMethod("card")}
              className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                method === "card"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <CreditCard className="h-4 w-4" />
              Card
            </button>

            <button
              type="button"
              onClick={() => setMethod("upi")}
              className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                method === "upi"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Smartphone className="h-4 w-4" />
              UPI
            </button>
          </div>

          {method === "card" ? (
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Name on Card
                </label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="e.g. Ananya Sharma"
                  className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${
                    errors.name
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(formatCardNumber(e.target.value))
                    }
                    placeholder="1234 5678 9012 3456"
                    className={`w-full rounded-lg border px-3 py-2.5 pr-10 text-sm outline-none transition focus:ring-2 ${
                      errors.number
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  />
                  <CreditCard className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
                {errors.number && (
                  <p className="mt-1 text-xs text-red-500">{errors.number}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-600">
                    Expiry
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    placeholder="MM/YY"
                    className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${
                      errors.expiry
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  />
                  {errors.expiry && (
                    <p className="mt-1 text-xs text-red-500">{errors.expiry}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-600">
                    CVV
                  </label>
                  <input
                    type="password"
                    inputMode="numeric"
                    maxLength={4}
                    value={cvv}
                    onChange={(e) =>
                      setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                    }
                    placeholder="•••"
                    className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${
                      errors.cvv
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  />
                  {errors.cvv && (
                    <p className="mt-1 text-xs text-red-500">{errors.cvv}</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">
                UPI ID
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="yourname@bank"
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${
                  errors.upi
                    ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                }`}
              />
              {errors.upi && (
                <p className="mt-1 text-xs text-red-500">{errors.upi}</p>
              )}
            </div>
          )}

          <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
            <Lock className="h-3.5 w-3.5" />
            This is a simulated, secure test payment. No real charges apply.
          </div>

          <Button type="submit" fullWidth className="h-12">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Pay {formatCurrency(booking.totalFare)}
          </Button>
        </form>
      )}

      {/* Success */}
      {stage === "success" && (
        <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-green-200 bg-green-50/70 p-8 text-center shadow-sm backdrop-blur-xl sm:p-10">
          <div className="success-circle relative flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
            <svg className="h-12 w-12" viewBox="0 0 52 52">
              <circle
                className="success-check-circle"
                cx="26"
                cy="26"
                r="24"
                fill="none"
              />
              <path
                className="success-check-mark"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Booking Confirmed!
            </h2>
            <p className="mt-2 max-w-sm text-slate-600">
              Your payment of{" "}
              <span className="font-semibold">
                {formatCurrency(booking.totalFare)}
              </span>{" "}
              was successful for {booking.trainName}.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
            <Ticket className="h-4 w-4 text-blue-600" />
            Booking Ref: {booking.pnr ?? pnr ?? "—"}
          </div>

          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Button onClick={() => router.push("/")}>
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>

          <style jsx>{`
            .success-circle {
              animation: pop 0.4s ease-out;
            }
            .success-check-circle {
              stroke: #16a34a;
              stroke-width: 2;
              stroke-dasharray: 151;
              stroke-dashoffset: 151;
              animation: circle-draw 0.6s ease-out forwards;
            }
            .success-check-mark {
              stroke: #16a34a;
              stroke-width: 4;
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-dasharray: 48;
              stroke-dashoffset: 48;
              animation: check-draw 0.4s ease-out 0.5s forwards;
            }
            @keyframes circle-draw {
              to {
                stroke-dashoffset: 0;
              }
            }
            @keyframes check-draw {
              to {
                stroke-dashoffset: 0;
              }
            }
            @keyframes pop {
              0% {
                transform: scale(0.5);
                opacity: 0;
              }
              100% {
                transform: scale(1);
                opacity: 1;
              }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}