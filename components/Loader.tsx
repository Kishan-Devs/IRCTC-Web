interface LoaderProps {
  text?: string;
}

export default function Loader({
  text = "Loading...",
}: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

      <p className="text-sm text-slate-600">
        {text}
      </p>
    </div>
  );
}