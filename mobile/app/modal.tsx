import { DatePicker } from "@/components/DatePicker";
import Error from "@/components/Error";
import ReservationForm from "@/components/ReservationForm";
import { useWild } from "@/context/WildContext";
import { ICabins, IRESERVATION } from "@/utils/helper";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { toastConfig } from "./_layout";

export default function Modal() {
  const initialState: IRESERVATION = {
    endAt: undefined,
    startDate: undefined,
    numGuests: 0,
    totalPrice: 0,
    observations: "",
    numNights: 0,
  };
  const { cabins, auth } = useWild();
  const { cabinId } = useLocalSearchParams();
  const cabin: ICabins | undefined = cabins.find((c) => c.id === +cabinId);
  const [reservationData, setReservationData] =
    useState<IRESERVATION>(initialState);
  const router = useRouter();
  useEffect(() => {
    if (!auth) router.push("/");
  }, [auth, router]);
  if (cabin === undefined)
    return <Error error="Something went wrong when fetch the data 💥" />;
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgb(19 28 36)",
        }}
      >
        <ReservationForm
          cabin={cabin}
          setReservationData={setReservationData}
          reservationData={reservationData}
        />
        <DatePicker
          setReservationData={setReservationData}
          reservationData={reservationData}
          cabin={cabin}
        />
      </View>
      <Toast config={toastConfig} />
    </>
  );
}
