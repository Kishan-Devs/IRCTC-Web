"use client";

import { CalendarDays, Clock3, MapPin, Ticket, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import Card from "@/components/Card";
import Button from "@/components/Button";

import { Train } from "@/types/train";
import { formatCurrency, seatStatus } from "@/lib/utils";

interface TrainCardProps {
  train: Train;
  journeyDate: string;
}

export default function TrainCard({
  train,
  journeyDate,
}: TrainCardProps) {
  const router = useRouter();

  const handleBookNow = () => {
    const params = new URLSearchParams({
      trainId: train.id.toString(),
      date: journeyDate,
    });

    router.push(`/passenger?${params.toString()}`);
  };

  return (
    <div
      className="
        group relative overflow-hidden rounded-2xl
        border border-white/40 bg-white/60
        p-4 shadow-md shadow-slate-200/50
        backdrop-blur-xl
        transition-all duration-500 ease-out
        hover:-translate-y-1 hover:scale-[1.01]
        hover:border-white/60 hover:bg-white/70
        hover:shadow-xl hover:shadow-blue-200/40
        sm:p-5
      "
    >
      {/* Decorative gradient blob — the "morph" accent */}
      <div
        className="
          pointer-events-none absolute -right-10 -top-10 h-32 w-32
          rounded-full bg-gradient-to-br from-blue-400/30 to-indigo-400/20
          blur-2xl transition-transform duration-700 ease-out
          group-hover:scale-125 group-hover:rotate-45
        "
      />

      {/* Header */}
      <div className="relative flex items-start justify-between gap-3 border-b border-slate-200/60 pb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <Ticket className="h-4 w-4 shrink-0 text-blue-600" />
            <span className="truncate text-xs font-medium tracking-wide text-blue-600">
              {train.number}
            </span>
          </div>

          <h2 className="mt-1 truncate text-lg font-bold text-slate-800 sm:text-xl">
            {train.name}
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            {train.class} • {train.distance} km
          </p>
        </div>

        <div
          className="
            shrink-0 rounded-xl border border-blue-100/80 bg-blue-50/80
            px-3 py-2 text-center backdrop-blur-sm
          "
        >
          <p className="text-[10px] text-slate-500">Fare</p>
          <h3 className="text-lg font-bold text-blue-600 sm:text-xl">
            {formatCurrency(train.fare)}
          </h3>
        </div>
      </div>

      {/* Journey Details */}
      <div className="relative grid grid-cols-3 items-center gap-2 py-4">
        <div className="min-w-0">
          <p className="text-[11px] text-slate-500">Departure</p>
          <h3 className="mt-0.5 truncate text-base font-bold text-slate-800 sm:text-lg">
            {train.departure}
          </h3>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-600">
            <MapPin className="h-3 w-3 shrink-0 text-blue-600" />
            <span className="truncate">{train.from}</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-1">
          <div className="flex w-full items-center gap-1">
            <span className="h-px flex-1 bg-slate-300/70" />
            <Clock3 className="h-4 w-4 shrink-0 text-blue-600" />
            <span className="h-px flex-1 bg-slate-300/70" />
          </div>
          <span className="text-[11px] font-semibold text-slate-700">
            {train.duration}
          </span>
        </div>

        <div className="min-w-0 text-right">
          <p className="text-[11px] text-slate-500">Arrival</p>
          <h3 className="mt-0.5 truncate text-base font-bold text-slate-800 sm:text-lg">
            {train.arrival}
          </h3>
          <div className="mt-1 flex items-center justify-end gap-1 text-[11px] text-slate-600">
            <span className="truncate">{train.to}</span>
            <MapPin className="h-3 w-3 shrink-0 text-green-600" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative flex flex-col gap-3 border-t border-slate-200/60 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-slate-100/70 px-2.5 py-1 text-[11px] text-slate-700">
            <CalendarDays className="h-3.5 w-3.5 text-blue-600" />
            {journeyDate}
          </div>

          <div className="inline-flex items-center rounded-full bg-green-100/80 px-2.5 py-1 text-[11px] font-medium text-green-700">
            {seatStatus(train.availableSeats)}
          </div>
        </div>

        <Button
          onClick={handleBookNow}
          className="group/btn flex w-full items-center justify-center gap-1.5 !py-2 text-sm sm:w-auto"
        >
          Book Now
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
        </Button>
      </div>
    </div>
  );
}