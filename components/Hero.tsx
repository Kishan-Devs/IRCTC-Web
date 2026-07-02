import { ArrowRight, ShieldCheck, Train, Ticket, Sparkles } from "lucide-react";
import Link from "next/link";

import Button from "@/components/Button";
import SearchForm from "./SearchForm";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-blue-600 to-sky-500">
      {/* Animated background blobs */}
      <div className="hero-blob pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="hero-blob-slow pointer-events-none absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="hero-blob-alt pointer-events-none absolute left-1/3 top-1/2 h-72 w-72 rounded-full bg-indigo-300/10 blur-3xl" />

      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Floating dots */}
      <div className="hero-float pointer-events-none absolute left-[15%] top-24 h-2 w-2 rounded-full bg-yellow-300/80" />
      <div className="hero-float-delay pointer-events-none absolute right-[20%] top-40 h-3 w-3 rounded-full bg-white/60" />
      <div className="hero-float pointer-events-none absolute bottom-32 left-[45%] h-2 w-2 rounded-full bg-cyan-200/70" />

      <div className="container relative grid min-h-[640px] items-center gap-12 py-16 lg:grid-cols-2 lg:py-20">
        {/* Left Content */}
        <div className="hero-fade text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
            Train Ticket Booking, Reimagined
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] md:text-6xl">
            Book Train Tickets
            <br />
            <span className="hero-gradient-text bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-300 bg-clip-text text-transparent">
              Fast &amp; Secure
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-blue-100">
            Search trains, reserve seats, complete a secure dummy payment,
            and instantly receive your ticket — all with a clean, modern
            IRCTC-inspired experience built using Next.js 15.
          </p>

          {/* CTA row */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="#search">
              <Button className="group h-12 gap-2 px-6 text-base">
                Search Trains
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link
              href="/bookings"
              className="text-sm font-medium text-white/80 underline-offset-4 transition hover:text-white hover:underline"
            >
              Check existing booking →
            </Link>
          </div>

          {/* Trust / stat glass pills */}
          <div className="mt-10 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur-md transition hover:bg-white/15">
              <div className="rounded-lg bg-white/15 p-1.5">
                <Train className="h-4 w-4 text-cyan-200" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold">500+</p>
                <p className="text-[11px] text-blue-100/80">Routes</p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur-md transition hover:bg-white/15">
              <div className="rounded-lg bg-white/15 p-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-200" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold">100%</p>
                <p className="text-[11px] text-blue-100/80">Secure</p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur-md transition hover:bg-white/15">
              <div className="rounded-lg bg-white/15 p-1.5">
                <Ticket className="h-4 w-4 text-yellow-200" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold">Instant</p>
                <p className="text-[11px] text-blue-100/80">PNR &amp; Ticket</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Search Form — glass wrapper */}
        <div
          id="search"
          className="hero-fade-delay relative mx-auto w-full max-w-lg lg:mx-0"
        >
          {/* Decorative glow behind the form */}
          <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-white/10 blur-2xl" />

          <div className="relative rounded-3xl border border-white/25 bg-white/90 shadow-2xl shadow-blue-900/30 backdrop-blur-2xl">
            <SearchForm />
          </div>          
        </div>
      </div>

      <style>{`
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-fade {
          animation: hero-fade-up 0.7s ease-out both;
        }

        .hero-fade-delay {
          animation: hero-fade-up 0.7s ease-out 0.15s both;
        }

        @keyframes blob-morph {
          0%, 100% { border-radius: 42% 58% 65% 35% / 45% 40% 60% 55%; transform: translate(0, 0) scale(1); }
          33% { border-radius: 60% 40% 35% 65% / 55% 65% 35% 45%; transform: translate(20px, -15px) scale(1.05); }
          66% { border-radius: 35% 65% 55% 45% / 40% 45% 55% 60%; transform: translate(-15px, 15px) scale(0.97); }
        }

        .hero-blob {
          animation: blob-morph 14s ease-in-out infinite;
        }

        .hero-blob-slow {
          animation: blob-morph 18s ease-in-out infinite reverse;
        }

        .hero-blob-alt {
          animation: blob-morph 22s ease-in-out infinite;
        }

        @keyframes float-y {
          0%, 100% { transform: translateY(0); opacity: 0.7; }
          50% { transform: translateY(-14px); opacity: 1; }
        }

        .hero-float {
          animation: float-y 5s ease-in-out infinite;
        }

        .hero-float-delay {
          animation: float-y 5s ease-in-out 1.2s infinite;
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .hero-gradient-text {
          background-size: 200% auto;
          animation: gradient-shift 4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-blob, .hero-blob-slow, .hero-blob-alt,
          .hero-float, .hero-float-delay,
          .hero-gradient-text, .hero-fade, .hero-fade-delay {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}