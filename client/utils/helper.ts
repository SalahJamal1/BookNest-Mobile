import { DateType } from "react-native-ui-datepicker";

type IBOOKING = {
  id: number;
  createdAt: Date;
  endAt: Date;
  startDate: Date;
  hasBreakfast: boolean;
  isPaid: boolean;
  numGuests: number;
  numNights: number;
  totalPrice: number;
  observations: string;
  cabins: ICabins;
};
export type IUSER = {
  email: string;
  password: string;
  firstName: "string";
  lastName: "string";
  bookings: IBOOKING[];
};
export type IState = {
  cabins: ICabins[];
  cabin: ICabins;
  error: string;
  loader: boolean;
  user: IUSER;
  auth: boolean;
};
export type IACTION =
  | { type: "CABINS_LOADER" }
  | { type: "CABINS_ERROR"; payload: string }
  | { type: "CABINS_DATA"; payload: ICabins[] }
  | { type: "CABIN_DATA"; payload: ICabins }
  | { type: "USER_LOGIN"; payload: IUSER }
  | { type: "USER_LOGOUT" }
  | { type: "USER_REFRESH"; payload: IUSER };

export type ICabins = {
  description: string;
  discount: number;
  id: number;
  image: string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
};

export type IRESERVATION = {
  endAt: Date | DateType | undefined;
  startDate: Date | DateType | undefined;
  numGuests: number | null;
  totalPrice: number;
  observations?: string;
  numNights: number;
};
export type ICONTEXT = {
  cabins: ICabins[];
  error: string;
  loader: boolean;
  dispatch: (action: IACTION) => void;
  user: IUSER;
  auth: boolean;
  cabin: ICabins;
};
export function calcDate(date1: DateType, date2: DateType) {
  if (date1 && date2) {
    const to = new Date(date1?.toString());
    const from = new Date(date2?.toString());
    const result = from.getTime() - to.getTime();
    return Math.trunc(result / (24 * 60 * 60 * 1000)) + 1;
  }
  return null;
}
