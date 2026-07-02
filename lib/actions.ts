"use server";

import { bookings } from "@/data/bookings";
import { passengers } from "@/data/passengers";
import { trains } from "@/data/trains";

import { Booking } from "@/types/booking";
import { Passenger } from "@/types/passenger";

import { generateBookingId, generatePNR } from "./pnr";
import { calculateFare, searchTrains } from "./utils";

/**
 * Search available trains
 */
export async function searchTrainAction(
  from: string,
  to: string,
  travelClass: string
) {
  return searchTrains(trains, from, to, travelClass);
}

/**
 * Save passenger locally
 */
export async function savePassengerAction(
  passenger: Passenger
) {
  passengers.push(passenger);

  return {
    success: true,
  };
}

/**
 * Dummy payment
 */
export async function processPaymentAction() {
  await new Promise((resolve) =>
    setTimeout(resolve, 1500)
  );

  return {
    success: true,
  };
}

/**
 * Create booking
 */
export async function createBookingAction(
  trainId: number,
  journeyDate: string,
  passengerList: Passenger[]
) {
  const train = trains.find((t) => t.id === trainId);

  if (!train) {
    throw new Error("Train not found");
  }

const booking: Booking = {
  id: String(bookings.length + 1),

  bookingId: generateBookingId(),

  pnr: generatePNR(),

  contactNumber: "", 

  trainId: train.id,

  trainName: train.name,

  trainNumber: train.number,

  from: train.from,

  to: train.to,

  journeyDate,

  fare: train.fare,

  totalFare: calculateFare(
    train.fare,
    passengerList.length
  ),

  passengers: passengerList,

  bookedAt: new Date().toISOString(),

  status: "confirmed",
};

  bookings.push(booking);

  return booking;
}

/**
 * Get all bookings
 */
export async function getBookingsAction() {
  return bookings;
}