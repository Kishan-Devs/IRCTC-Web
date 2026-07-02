import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="container grid gap-10 py-12 md:grid-cols-3">
        {/* Brand */}

        <div>
          <div className="mb-4 flex items-center gap-3">
            <Image
              src="/images/logo-irctc.png"
              alt="IRCTC Logo"
              width={48}
              height={48}
              className="rounded-lg object-contain"
            />

            <div>
              <h2 className="text-lg font-bold text-blue-700">
                IRCTC
              </h2>

              <p className="text-xs text-slate-500">
                Train Ticket Booking
              </p>
            </div>
          </div>

          <p className="text-sm leading-6 text-slate-600">
            A modern train ticket booking demo built with
            Next.js 15, TypeScript, and Tailwind CSS.
          </p>
        </div>

        {/* Quick Links */}

        <div>
          <h3 className="mb-4 font-semibold">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-sm">
            <Link
              href="/"
              className="transition-colors hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              href="/trains"
              className="transition-colors hover:text-blue-600"
            >
              Search Trains
            </Link>

            <Link
              href="/bookings"
              className="transition-colors hover:text-blue-600"
            >
              Booking History
            </Link>
          </div>
        </div>

        {/* Contact */}

        <div>
          <h3 className="mb-4 font-semibold">
            Contact
          </h3>

          <div className="space-y-2 text-sm text-slate-600">
            <p>Email: support@irctc.com</p>
            <p>Phone: +91 1800-000-0000</p>
            <p>Available: 24 × 7</p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 py-5 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} IRCTC Clone. Built with
        Next.js 15.
      </div>
    </footer>
  );
}