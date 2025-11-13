import axios from "axios";
import { Platform } from "react-native";
let baseURL;

if (Platform.OS === "android") {
  baseURL = "http://10.0.2.2:5208/api/v1";
} else {
  baseURL = "http://192.168.1.12:5208/api/v1";
}

export const api = axios.create({
  baseURL,
});
export async function apiCabins() {
  const res = await api.get("/cabins");

  return res;
}
export async function apiCabin(id: number) {
  const res = await api.get(`/cabins/${id}`);
  return res;
}
