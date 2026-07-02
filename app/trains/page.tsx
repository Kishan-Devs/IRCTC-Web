import { Suspense } from "react";

import EmptyState from "@/components/EmptyState";
import Loader from "@/components/Loader";
import TrainCard from "@/components/TrainCard";
import TrainSearchBar from "@/components/TrainSearchBar";

import { searchTrainAction } from "@/lib/actions";

interface TrainsPageProps {
  searchParams: Promise<{
    from?: string;
    to?: string;
    date?: string;
    class?: string;
  }>;
}

async function TrainResults({
  searchParams,
}: TrainsPageProps) {
  const params = await searchParams;

  const from = params.from ?? "";
  const to = params.to ?? "";
  const journeyDate = params.date ?? "";
  const travelClass = params.class ?? "";

  // Search matching trains
  const trains = await searchTrainAction(
    from,
    to,
    travelClass
  );

  return (
    <>
      {/* Editable Journey Search Bar */}
      <TrainSearchBar
        from={from}
        to={to}
        journeyDate={journeyDate}
        travelClass={travelClass}
      />

      {/* Empty State */}

      {trains.length === 0 ? (
        <EmptyState
          title="No Trains Found"
          description="Try selecting another route, travel class, or journey date."
        />
      ) : (
        <>
          <div className="mb-6">
            <p className="text-slate-600">
              <span className="font-semibold">
                {trains.length}
              </span>{" "}
              train{trains.length > 1 ? "s" : ""} found
              for your journey.
            </p>
          </div>

          <div className="space-y-6">
            {trains.map((train) => (
              <TrainCard
                key={train.id}
                train={train}
                journeyDate={journeyDate}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default async function TrainsPage({
  searchParams,
}: TrainsPageProps) {
  return (
    <main className="container py-10">
      {/* Header */}

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-800">
          Available Trains
        </h1>

        <p className="mt-2 text-slate-600">
          Browse available trains and choose the best
          option for your journey.
        </p>
      </div>

      {/* Results */}

      <Suspense
        fallback={
          <Loader text="Searching trains..." />
        }
      >
        <TrainResults
          searchParams={searchParams}
        />
      </Suspense>
    </main>
  );
}