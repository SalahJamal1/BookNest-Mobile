import { IUSERLOGIN } from "@/app/account/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./apiCabins";

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
export async function apiLogin(data: IUSERLOGIN) {
  const res = await api.post("/auth/login", data);
  return res;
}

export async function apiSignup(data: any) {
  const res = await api.post("/auth/signup", data);
  return res;
}
export async function apiRefresh() {
  const deviceId = await AsyncStorage.getItem("deviceId");
  if (!deviceId) return;
  const res = await api.post(
    "/auth/refresh-token",
    {},
    {
      headers: { deviceId },
    }
  );
  return res;
}
export async function apiLogout() {
  const deviceId = await AsyncStorage.getItem("deviceId");
  if (!deviceId) return;
  const res = await api.get("/auth/logout", {
    headers: { deviceId },
  });
  return res;
}
