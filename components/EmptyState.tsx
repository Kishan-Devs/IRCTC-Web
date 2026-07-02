import { SearchX } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = "Nothing Found",
  description = "No data available.",
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-14 text-center shadow-sm">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
        <SearchX className="h-8 w-8 text-slate-500" />
      </div>

      <h2 className="text-xl font-semibold text-slate-800">
        {title}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-slate-500">
        {description}
      </p>
    </div>
  );
}