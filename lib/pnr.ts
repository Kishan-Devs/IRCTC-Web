/**
 * Generate 10-digit PNR
 */
export function generatePNR(): string {
  return Math.floor(
    1000000000 + Math.random() * 9000000000
  ).toString();
}

/**
 * Generate Booking ID
 */
export function generateBookingId(): string {
  return (
    "BK" +
    Date.now().toString().slice(-6) +
    Math.floor(Math.random() * 900 + 100)
  );
}