import { Train } from "@/types/train";

/**
 * Format number into Indian Rupees
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date to readable format
 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Search trains
 */
export function searchTrains(
  trains: Train[],
  from: string,
  to: string,
  travelClass?: string
) {
  return trains.filter((train) => {
    const matchesRoute =
      train.from === from && train.to === to;

    const matchesClass = !travelClass
      ? true
      : travelClass === "All"
        ? true
        : train.class === "All" ||
          train.class === travelClass;

    return matchesRoute && matchesClass;
  });
}

/**
 * Calculate fare
 */
export function calculateFare(
  fare: number,
  passengerCount: number
) {
  return fare * passengerCount;
}

/**
 * Get seat availability text
 */
export function seatStatus(seats: number) {
  if (seats <= 0) return "WL";
  if (seats < 10) return `Only ${seats} Left`;
  return `${seats} Available`;
}

/**
 * Format train duration
 */
export function formatDuration(duration: string) {
  return duration;
}