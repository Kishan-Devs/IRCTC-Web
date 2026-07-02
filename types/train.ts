export type TravelClass =
  | "All"
  | "SL"
  | "3A"
  | "2A"
  | "1A"
  | "CC";

export interface TrainClass {
  class: TravelClass;
}

export interface Train {
  id: number;
  number: string;
  name: string;

  from: string;
  to: string;

  departure: string;
  arrival: string;

  duration: string;

  distance: number;

  availableSeats: number;

  fare: number;

  class: TravelClass;

  runningDays: string[];
}