import {
  CalendarDays,
  IndianRupee,
  Ticket,
  Train,
  Users,
} from "lucide-react";

import Card from "@/components/Card";

import { Booking } from "@/types/booking";
import { formatCurrency, formatDate } from "@/lib/utils";

interface BookingCardProps {
  booking: Booking;
}

export default function BookingCard({
  booking,
}: BookingCardProps) {
const statusColor = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  confirmed: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
} as const;


  return (
    <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Header */}

      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Train className="h-5 w-5 text-blue-600" />

            <h2 className="text-xl font-bold text-slate-800">
              {booking.trainName}
            </h2>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Train No. {booking.trainNumber}
          </p>
        </div>

      <div
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${
          statusColor[booking.status]
        }`}
      >
        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
      </div>
      </div>

      {/* Booking Details */}

      <div className="grid gap-5 py-6 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-sm text-slate-500">
            PNR
          </p>

          <div className="mt-2 flex items-center gap-2">
            <Ticket className="h-4 w-4 text-blue-600" />

            <span className="font-semibold">
              {booking.trainName}
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Booking ID
          </p>

          <p className="mt-2 font-semibold">
            {booking.trainId}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Journey
          </p>

          <div className="mt-2 flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-blue-600" />

            <span className="font-semibold">
              {formatDate(booking.journeyDate)}
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Route
          </p>

          <p className="mt-2 font-semibold">
            {booking.from} → {booking.to}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Passengers
          </p>

          <div className="mt-2 flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />

            <span className="font-semibold">
              {booking.passengers.length}
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Total Fare
          </p>

          <div className="mt-2 flex items-center gap-2">
            <IndianRupee className="h-4 w-4 text-blue-600" />

            <span className="font-semibold">
              {formatCurrency(
                booking.totalFare
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Passenger List */}

      <div className="border-t border-slate-200 pt-5">
        <h3 className="mb-4 font-semibold text-slate-800">
          Passenger Details
        </h3>

        <div className="space-y-3">
          {booking.passengers.map((passenger) => (
            <div
              key={passenger.id}
              className="flex flex-col justify-between rounded-xl bg-slate-50 p-4 md:flex-row md:items-center"
            >
              <div>
                <h4 className="font-semibold">
                  {passenger.name}
                </h4>

                <p className="text-sm text-slate-500">
                  {passenger.age} Years •{" "}
                  {passenger.gender}
                </p>
              </div>

              <div className="mt-3 text-sm text-slate-600 md:mt-0">
                Berth Preference:{" "}
                <span className="font-medium">
                  {passenger.berthPreference}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}

      <div className="mt-6 border-t border-slate-200 pt-5">
        <p className="text-sm text-slate-500">
          Booked on{" "}
          <span className="font-medium text-slate-700">
            {formatDate(
              booking.journeyDate
            )}
          </span>
        </p>
      </div>
    </Card>
  );
}