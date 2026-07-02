"use client";

import { usePathname, useRouter } from "next/navigation";

import { stations } from "@/data/stations";
import { TravelClass } from "@/types/train";

interface TrainSearchBarProps {
  from: string;
  to: string;
  journeyDate: string;
  travelClass: string;
}

const travelClasses: TravelClass[] = ["SL", "3A", "2A", "1A", "CC"];

export default function TrainSearchBar({
  from,
  to,
  journeyDate,
  travelClass,
}: TrainSearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const updateParams = (
    updates: Partial<{
      from: string;
      to: string;
      date: string;
      class: string;
    }>
  ) => {
    const params = new URLSearchParams({
      from,
      to,
      date: journeyDate,
      class: travelClass,
      ...updates,
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-6 md:grid-cols-4">
        {/* From */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            From Station
          </label>

          <select
            value={from}
            onChange={(e) => updateParams({ from: e.target.value })}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Select Source Station</option>
            {stations.map((station) => (
              <option key={station.code} value={station.code}>
                {station.name} ({station.code})
              </option>
            ))}
          </select>
        </div>

        {/* To */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            To Station
          </label>

          <select
            value={to}
            onChange={(e) => updateParams({ to: e.target.value })}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Select Destination Station</option>
            {stations.map((station) => (
              <option key={station.code} value={station.code}>
                {station.name} ({station.code})
              </option>
            ))}
          </select>
        </div>

        {/* Journey Date */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Journey Date
          </label>

          <input
            type="date"
            value={journeyDate}
            onChange={(e) => updateParams({ date: e.target.value })}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Travel Class */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Travel Class
          </label>

          <select
            value={travelClass}
            onChange={(e) => updateParams({ class: e.target.value })}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            {travelClasses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}