import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "IRCTC - Train Ticket Booking",
  description: "Modern Train Ticket Booking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50">
        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}