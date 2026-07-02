"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Users,
  Minus,
  Plus,
  Loader2,
  AlertCircle,
  Phone,
} from "lucide-react";

import Button from "@/components/Button";
import { Gender } from "@/types/passenger";
import { Booking } from "@/types/booking";
import { Train } from "@/types/train";
import { generateBookingId, generatePNR } from "@/lib/pnr";

interface PassengerFormProps {
  train: Train;
  journeyDate: string;
}

interface PassengerEntry {
  name: string;
  age: string;
  gender: Gender | "";
}

interface FieldErrors {
  name?: string;
  age?: string;
  gender?: string;
}

const MIN_TICKETS = 1;
const MAX_TICKETS = 6;
const MIN_AGE = 8;

const emptyPassenger: PassengerEntry = {
  name: "",
  age: "",
  gender: "",
};

export default function PassengerForm({
  train,
  journeyDate,
}: PassengerFormProps) {
  const router = useRouter();

  const [contactNumber, setContactNumber] = useState("");
  const [contactError, setContactError] = useState<string | undefined>();

  const [nooftkts, setNooftkts] = useState(1);
  const [passengers, setPassengers] = useState<PassengerEntry[]>([
    { ...emptyPassenger },
  ]);
  const [errors, setErrors] = useState<Record<number, FieldErrors>>({});
  const [submitting, setSubmitting] = useState(false);

  const updateTicketCount = (delta: number) => {
    const next = Math.min(
      MAX_TICKETS,
      Math.max(MIN_TICKETS, nooftkts + delta)
    );

    if (next === nooftkts) return;

    setNooftkts(next);

    setPassengers((prev) => {
      const updated = [...prev];

      if (next > prev.length) {
        while (updated.length < next) {
          updated.push({ ...emptyPassenger });
        }
      } else {
        updated.length = next;
      }

      return updated;
    });
  };

  const updatePassenger = (
    index: number,
    field: keyof PassengerEntry,
    value: string
  ) => {
    setPassengers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );

    setErrors((prev) => {
      if (!prev[index]?.[field]) return prev;
      const next = { ...prev };
      next[index] = { ...next[index], [field]: undefined };
      return next;
    });
  };

  const validate = (): boolean => {
    const newErrors: Record<number, FieldErrors> = {};
    let hasError = false;

    // Contact number
    const digits = contactNumber.replace(/\D/g, "");
    if (!digits) {
      setContactError("Mobile number is required.");
      hasError = true;
    } else if (digits.length !== 10) {
      setContactError("Enter a valid 10-digit mobile number.");
      hasError = true;
    } else {
      setContactError(undefined);
    }

    passengers.forEach((p, i) => {
      const fieldErrors: FieldErrors = {};

      if (!p.name.trim()) {
        fieldErrors.name = "Name is required.";
      } else if (p.name.trim().length < 2) {
        fieldErrors.name = "Name is too short.";
      }

      const ageNum = Number(p.age);
      if (!p.age) {
        fieldErrors.age = "Age is required.";
      } else if (!Number.isInteger(ageNum) || ageNum <= 0 || ageNum > 120) {
        fieldErrors.age = "Enter a valid age.";
      } else if (ageNum < MIN_AGE) {
        fieldErrors.age = `Booking not allowed for passengers under ${MIN_AGE} years.`;
      }

      if (!p.gender) {
        fieldErrors.gender = "Please select gender.";
      }

      if (Object.keys(fieldErrors).length > 0) {
        newErrors[i] = fieldErrors;
        hasError = true;
      }
    });

    setErrors(newErrors);
    return !hasError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);

    const bookingPassengers = passengers.map((p, i) => ({
      id: i + 1,
      name: p.name.trim(),
      age: Number(p.age),
      gender: p.gender as Gender,
      nooftkts,
    }));

    const booking: Booking = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `bk_${Date.now()}`,

      bookingId: generateBookingId(),

      pnr: generatePNR(),

      contactNumber: contactNumber.replace(/\D/g, ""),

      trainId: train.id,
      trainName: train.name,
      trainNumber: train.number,
      from: train.from,
      to: train.to,

      journeyDate,

      fare: train.fare,

      totalFare: train.fare * nooftkts,

      passengers: bookingPassengers,

      bookedAt: new Date().toISOString(),

      status: "pending",
    };
    try {
      const existingRaw = localStorage.getItem("bookings");
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      existing.push(booking);
      localStorage.setItem("bookings", JSON.stringify(existing));

      await new Promise((res) => setTimeout(res, 400));

      router.push(`/payment?bookingId=${booking.id}`);
    } catch (err) {
      console.error("Failed to save booking:", err);
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-white/40 bg-white/70 p-6 shadow-sm backdrop-blur-xl sm:p-7"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-200/60 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Passenger Information
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Add details for each passenger travelling.
          </p>
        </div>

        {/* Ticket Stepper */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <Users className="h-4 w-4 text-blue-600" />

          <span className="text-sm font-medium text-slate-600">
            Tickets
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => updateTicketCount(-1)}
              disabled={nooftkts <= MIN_TICKETS}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>

            <span className="w-5 text-center text-sm font-bold text-slate-800">
              {nooftkts}
            </span>

            <button
              type="button"
              onClick={() => updateTicketCount(1)}
              disabled={nooftkts >= MAX_TICKETS}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Contact Number */}
      <div className="rounded-xl border border-slate-200 bg-white/80 p-4 sm:p-5">
        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-600">
          <Phone className="h-3.5 w-3.5 text-blue-600" />
          Contact Mobile Number
        </label>

        <input
          type="tel"
          inputMode="numeric"
          value={contactNumber}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
            setContactNumber(digits);
            if (contactError) setContactError(undefined);
          }}
          placeholder="e.g. 9876543210"
          className={`w-full max-w-xs rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${
            contactError
              ? "border-red-300 focus:border-red-500 focus:ring-red-100"
              : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
          }`}
        />

        <p className="mt-1 text-xs text-slate-400">
          Booking confirmation and updates will be sent to this number.
        </p>

        {contactError && (
          <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
            <AlertCircle className="h-3 w-3" />
            {contactError}
          </p>
        )}
      </div>

      {/* Passenger Blocks */}
      <div className="space-y-5">
        {passengers.map((passenger, index) => {
          const fieldErrors = errors[index] ?? {};

          return (
            <div
              key={index}
              className="rounded-xl border border-slate-200 bg-white/80 p-4 transition-all duration-300 hover:border-blue-200 hover:shadow-sm sm:p-5"
            >
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100">
                  <User className="h-3.5 w-3.5 text-blue-600" />
                </div>
                <h3 className="text-sm font-semibold text-slate-700">
                  Passenger {index + 1}
                </h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {/* Name */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-600">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={passenger.name}
                    onChange={(e) =>
                      updatePassenger(index, "name", e.target.value)
                    }
                    placeholder="e.g. Ananya Sharma"
                    className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${
                      fieldErrors.name
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  />

                  {fieldErrors.name && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                {/* Age */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-600">
                    Age
                  </label>

                  <input
                    type="number"
                    min={1}
                    max={120}
                    value={passenger.age}
                    onChange={(e) =>
                      updatePassenger(index, "age", e.target.value)
                    }
                    placeholder="e.g. 29"
                    className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${
                      fieldErrors.age
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  />

                  {fieldErrors.age ? (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      {fieldErrors.age}
                    </p>
                  ) : (
                    <p className="mt-1 text-[11px] text-slate-400">
                      Minimum age {MIN_AGE} years to book a ticket.
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-600">
                    Gender
                  </label>

                  <select
                    value={passenger.gender}
                    onChange={(e) =>
                      updatePassenger(index, "gender", e.target.value)
                    }
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 ${
                      fieldErrors.gender
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>

                  {fieldErrors.gender && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      {fieldErrors.gender}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Fare Preview */}
      <div className="flex items-center justify-between rounded-xl bg-blue-50/80 px-4 py-3">
        <span className="text-sm text-slate-600">
          {nooftkts} passenger{nooftkts > 1 ? "s" : ""} × fare
        </span>
        <span className="text-lg font-bold text-blue-600">
          ₹{(train.fare * nooftkts).toLocaleString("en-IN")}
        </span>
      </div>

      {/* Submit */}
      <Button type="submit" fullWidth disabled={submitting} className="h-12">
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Proceeding to payment...
          </>
        ) : (
          "Proceed to Payment"
        )}
      </Button>
    </form>
  );
}