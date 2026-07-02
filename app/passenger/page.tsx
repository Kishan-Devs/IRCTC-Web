import { notFound } from "next/navigation";
import { CalendarDays, Clock3, Train as TrainIcon } from "lucide-react";

import Card from "@/components/Card";
import PassengerForm from "@/components/PassengerForm";

import { trains } from "@/data/trains";
import { formatCurrency } from "@/lib/utils";

interface PassengerPageProps {
  searchParams: Promise<{
    trainId?: string;
    date?: string;
  }>;
}

export default async function PassengerPage({
  searchParams,
}: PassengerPageProps) {
  const params = await searchParams;

  const trainId = Number(params.trainId);
  const journeyDate = params.date ?? "";

  if (!trainId || !journeyDate) {
    notFound();
  }

  const train = trains.find((item) => item.id === trainId);

  if (!train) {
    notFound();
  }

  return (
    <main className="container py-10">
      {/* Page Header */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Passenger Details
        </h1>

        <p className="mt-2 text-slate-600">
          Enter passenger information to continue with your booking.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Train Summary */}

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-3">
                <TrainIcon className="h-6 w-6 text-blue-600" />
              </div>

              <div>
                <h2 className="text-xl font-bold">{train.name}</h2>
                <p className="text-sm text-slate-500">{train.number}</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex justify-between">
                <span className="text-slate-500">From</span>
                <span className="font-semibold">{train.from}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">To</span>
                <span className="font-semibold">{train.to}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Departure</span>
                <span className="font-semibold">{train.departure}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Arrival</span>
                <span className="font-semibold">{train.arrival}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Duration</span>
                <div className="flex items-center gap-2 font-semibold">
                  <Clock3 className="h-4 w-4 text-blue-600" />
                  {train.duration}
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Journey</span>
                <div className="flex items-center gap-2 font-semibold">
                  <CalendarDays className="h-4 w-4 text-blue-600" />
                  {journeyDate}
                </div>
              </div>

              <hr />

              <div className="flex justify-between text-lg">
                <span>Fare</span>
                <span className="font-bold text-blue-600">
                  {formatCurrency(train.fare)}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Passenger Form */}

        <div className="lg:col-span-2">
          <PassengerForm train={train} journeyDate={journeyDate} />
        </div>
      </div>
    </main>
  );
}