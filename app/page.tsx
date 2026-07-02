import Hero from "@/components/Hero";
import SearchForm from "@/components/SearchForm";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Search Section */}
      <section
        id="search"
        className="container -mt-16 relative z-20 pb-20"
      >
      </section>

      {/* Features */}
      <section className="relative overflow-hidden py-16">
        {/* Ambient background blobs */}
        <div className="pointer-events-none absolute left-1/4 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="pointer-events-none absolute right-1/4 top-32 h-72 w-72 translate-x-1/2 rounded-full bg-indigo-300/20 blur-3xl" />

        <div className="container relative">
          <div className="feature-fade mb-14 text-center">
            <span className="inline-block rounded-full border border-slate-200/80 bg-white/60 px-4 py-1.5 text-xs font-medium tracking-wide text-slate-500 backdrop-blur-md">
              Built with Next.js 15
            </span>

            <h2 className="mt-4 text-3xl font-bold text-slate-800 sm:text-4xl">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                IRCTC ?
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-slate-600">
              A simple, modern and responsive train ticket booking
              experience.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div
              className="feature-card feature-fade group relative overflow-hidden rounded-2xl border border-white/50 bg-white/50 p-8 shadow-sm backdrop-blur-xl"
              style={{ animationDelay: "0ms" }}
            >
              <div className="feature-glow absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-blue-400/30 to-transparent blur-2xl transition-all duration-700 group-hover:scale-150" />

              <span className="relative text-sm font-bold tracking-wider text-blue-500/70">
                01
              </span>

              <h3 className="relative mt-3 text-xl font-semibold text-slate-800">
                Search Trains
              </h3>

              <p className="relative mt-3 text-slate-600">
                Search trains by source, destination, journey date and
                travel class.
              </p>

              <div className="relative mt-6 h-px w-full bg-gradient-to-r from-blue-400/0 via-blue-400/40 to-blue-400/0 transition-all duration-500 group-hover:via-blue-500/80" />
            </div>

            {/* Card 2 */}
            <div
              className="feature-card feature-fade group relative overflow-hidden rounded-2xl border border-white/50 bg-white/50 p-8 shadow-sm backdrop-blur-xl"
              style={{ animationDelay: "120ms" }}
            >
              <div className="feature-glow absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-400/30 to-transparent blur-2xl transition-all duration-700 group-hover:scale-150" />

              <span className="relative text-sm font-bold tracking-wider text-indigo-500/70">
                02
              </span>

              <h3 className="relative mt-3 text-xl font-semibold text-slate-800">
                Easy Booking
              </h3>

              <p className="relative mt-3 text-slate-600">
                Complete passenger details and dummy payment within a
                few clicks.
              </p>

              <div className="relative mt-6 h-px w-full bg-gradient-to-r from-indigo-400/0 via-indigo-400/40 to-indigo-400/0 transition-all duration-500 group-hover:via-indigo-500/80" />
            </div>

            {/* Card 3 */}
            <div
              className="feature-card feature-fade group relative overflow-hidden rounded-2xl border border-white/50 bg-white/50 p-8 shadow-sm backdrop-blur-xl"
              style={{ animationDelay: "240ms" }}
            >
              <div className="feature-glow absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-400/30 to-transparent blur-2xl transition-all duration-700 group-hover:scale-150" />

              <span className="relative text-sm font-bold tracking-wider text-emerald-500/70">
                03
              </span>

              <h3 className="relative mt-3 text-xl font-semibold text-slate-800">
                Instant Ticket
              </h3>

              <p className="relative mt-3 text-slate-600">
                Receive a generated PNR, Booking ID and printable
                ticket instantly.
              </p>

              <div className="relative mt-6 h-px w-full bg-gradient-to-r from-emerald-400/0 via-emerald-400/40 to-emerald-400/0 transition-all duration-500 group-hover:via-emerald-500/80" />
            </div>
          </div>
        </div>

        <style>{`
          @keyframes feature-fade-up {
            from {
              opacity: 0;
              transform: translateY(16px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .feature-fade {
            animation: feature-fade-up 0.6s ease-out both;
          }

          .feature-card {
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.4s ease, background-color 0.4s ease,
              border-color 0.4s ease;
          }

          .feature-card:hover {
            transform: translateY(-6px) scale(1.015);
            background-color: rgba(255, 255, 255, 0.7);
            border-color: rgba(255, 255, 255, 0.8);
            box-shadow: 0 20px 40px -12px rgba(59, 130, 246, 0.18);
          }
        `}</style>
      </section>


    </>
  );
}