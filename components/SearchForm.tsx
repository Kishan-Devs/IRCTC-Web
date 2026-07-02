"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import Button from "@/components/Button";
import { stations } from "@/data/stations";
import { TravelClass } from "@/types/train";
import Autocomplete from "./Autocomplete";

type FormErrors = {
  from?: string;
  to?: string;
  journeyDate?: string;
};

const travelClasses: TravelClass[] = [
  "SL",
  "3A",
  "2A",
  "1A",
  "CC",
];

export default function SearchForm() {
  const router = useRouter();

  const today = useMemo(() => {
    return new Date().toISOString().split("T")[0];
  }, []);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [journeyDate, setJourneyDate] =
    useState(today);
  const [travelClass, setTravelClass] =
    useState<TravelClass>("SL");

  const [errors, setErrors] =
    useState<FormErrors>({});

  const handleSubmit = (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  const newErrors: FormErrors = {};

  if (!from) {
    newErrors.from = "Please select a source station.";
  }

  if (!to) {
    newErrors.to =
      "Please select a destination station.";
  }

  if (from && to && from === to) {
    newErrors.to =
      "Source and destination cannot be the same.";
  }

  if (!journeyDate) {
    newErrors.journeyDate =
      "Please select a journey date.";
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    return;
  }

  const params = new URLSearchParams({
    from,
    to,
    date: journeyDate,
    class: travelClass,
  });

  router.push(`/trains?${params.toString()}`);
};

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">
          Search Trains
        </h2>

        <p className="mt-2 text-slate-500">
          Search available trains and book your
          journey in minutes.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* From & To */}

        <div className="grid gap-6 md:grid-cols-2">
          <Autocomplete
            label="From Station"
            placeholder="Select Source Station"
            items={stations}
            value={from}
            onChange={setFrom}
            error={errors.from}
          />

          <Autocomplete
            label="To Station"
            placeholder="Select Destination Station"
            items={stations}
            value={to}
            onChange={setTo}
            error={errors.to}
          />
        </div>

        {/* Date & Class */}

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Journey Date
            </label>

            <input
              type="date"
              min={today}
              value={journeyDate}
              onChange={(e) =>
                setJourneyDate(e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            {errors.journeyDate && (
              <p className="mt-2 text-sm text-red-500">
                {errors.journeyDate}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Travel Class
            </label>

            <select
              value={travelClass}
              onChange={(e) =>
                setTravelClass(
                  e.target.value as TravelClass
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              {travelClasses.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Button */}

        <Button
          type="submit"
          fullWidth
          className="h-12"
        >
          <Search className="mr-2 h-5 w-5" />

          Search Trains
        </Button>
      </form>
    </div>
  );
}
