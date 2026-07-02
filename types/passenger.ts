export type Gender =
  | "Male"
  | "Female"
  | "Other";

export type BerthPreference =
  | "Lower"
  | "Middle"
  | "Upper"
  | "Side Lower"
  | "Side Upper"
  | "No Preference";

export interface Passenger {
  id: number;

  name: string;

  age: number;

  gender: Gender;

  nooftkts: number;
  
  berthPreference: BerthPreference;

  mobile: string;

  email: string;
}