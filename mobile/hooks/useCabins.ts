import { apiCabin, apiCabins } from "@/api/apiCabins";
import { IACTION } from "@/utils/helper";
import { useCallback } from "react";

export default function useCabins() {
  const fetchCabins = useCallback(
    async (dispatch: (action: IACTION) => void) => {
      dispatch({ type: "CABINS_LOADER" });
      try {
        const res = await apiCabins();
        dispatch({
          type: "CABINS_DATA",
          payload: res?.data,
        });
      } catch (err: any) {
        const message: string =
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong when fetch the data 💥";
        dispatch({
          type: "CABINS_ERROR",
          payload: message,
        });
      }
    },
    []
  );
  const fetchCabin = useCallback(
    async (cabinId: number, dispatch: (action: IACTION) => void) => {
      dispatch({ type: "CABINS_LOADER" });
      try {
        const res = await apiCabin(cabinId);
        dispatch({
          type: "CABIN_DATA",
          payload: res?.data,
        });
      } catch (err: any) {
        const message: string =
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong when fetch the data 💥";
        dispatch({
          type: "CABINS_ERROR",
          payload: message,
        });
      }
    },
    []
  );

  return { fetchCabins, fetchCabin };
}
