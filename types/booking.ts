import { Passenger } from "@/types/passenger";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled";

export interface Booking {
  id: string;
  bookingId: string;
  pnr?: string;
  contactNumber: string;
  trainId: number;
  trainName: string;
  trainNumber: string;
  from: string;
  to: string;
  journeyDate: string;
  fare: number;
  totalFare: number;
  passengers: Passenger[];
  bookedAt: string;
  status: BookingStatus;
}