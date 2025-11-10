import { apiRefresh } from "@/api/apiAuth";
import { IACTION } from "@/utils/helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export default function useRefresh(dispatch: (action: IACTION) => void): void {
  useEffect(() => {
    const refreshUser = async () => {
      const jwt = await AsyncStorage.getItem("jwt");
      if (jwt) {
        try {
          const res = await apiRefresh();

          dispatch({ type: "USER_REFRESH", payload: res?.data?.user });
          AsyncStorage.setItem("jwt", res?.data?.refresh_token);
        } catch (err: any) {
          console.log("hi", err.message);
        }
      }
    };

    refreshUser();
  }, [dispatch]);
}
