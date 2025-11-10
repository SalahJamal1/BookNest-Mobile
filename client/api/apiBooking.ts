import { IRESERVATION } from "@/utils/helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./apiCabins";

export async function createBooking(
  bookingData: IRESERVATION,
  cabinId: number | string
) {
  const token = await AsyncStorage.getItem("jwt");
  if (!token) throw Error("UNAUTHORIZED");

  const res = await api.post("/bookings", bookingData, {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      cabinId,
    },
  });
  return res;
}
