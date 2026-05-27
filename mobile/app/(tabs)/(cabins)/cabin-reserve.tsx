import { DatePicker } from "@/components/DatePicker";
import Error from "@/components/Error";
import ReservationForm from "@/components/ReservationForm";
import { useWild } from "@/context/WildContext";
import { calcDate, ICabins, IRESERVATION } from "@/utils/helper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../_layout";

import { createBooking } from "@/api/apiBooking";
import { apiRefresh } from "@/api/apiAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CabinReserve() {
  const initialState: IRESERVATION = {
    endAt: undefined,
    startDate: undefined,
    numGuests: 0,
    totalPrice: 0,
    observations: "",
    numNights: 0,
  };
  const { cabins, auth, dispatch } = useWild();
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
  const numNights: number | null = calcDate(
    reservationData?.startDate,
    reservationData?.endAt,
  );
  const finalPrice =
    cabin.discount > 0
      ? cabin.regularPrice - cabin.discount
      : cabin.regularPrice;
  const totalPrice: number = (numNights && numNights * finalPrice) ?? 0;

  const hasRange = reservationData?.startDate && reservationData?.endAt;
  const handleSubmit = async () => {
    const newBooking: IRESERVATION = {
      ...reservationData!,
      numGuests: Number(
        String(reservationData?.numGuests).split(" ")[0] as unknown as number,
      ),
    };

    try {
      const res = await createBooking(newBooking, cabin.id);
      const refresh = await apiRefresh();
      dispatch({ type: "USER_REFRESH", payload: refresh?.data?.user });
      await AsyncStorage.setItem("jwt", refresh?.data?.refresh_token);
      setReservationData({} as IRESERVATION);
      router.replace("/(tabs)/(profile)/reservations");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.NumGuests?.join(",") ||
        error?.response?.data?.errors?.NumNights?.join(",") ||
        error.message ||
        "Something went wrong, try again";
      Toast.show({
        type: "error",
        text1: message,
        position: "top",
        topOffset: 80,
      });
    }
  };
  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "rgb(15, 23, 30)",
          paddingBottom: 40,
          position: "relative",
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
          totalPrice={totalPrice}
          numNights={numNights}
          hasRange={hasRange}
        />
      </ScrollView>

      <Toast config={toastConfig} />
      {hasRange && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            backgroundColor: "rgb(15, 23, 30)",
            flex: 1,
            width: "100%",
            height: 80,
          }}
        >
          <View style={styles.priceSummary}>
            <View style={styles.nightsBlock}>
              <Text style={styles.nightsCount}>{numNights}</Text>
              <Text style={styles.nightsLabel}>
                {numNights === 1 ? "Night" : "Nights"}
              </Text>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.priceBreakdownLabel}>Rate</Text>
              <View style={styles.priceRateRow}>
                <Text style={styles.priceBreakdownValue}>${finalPrice}</Text>
                {cabin.discount > 0 && (
                  <Text style={styles.originalPriceStrike}>
                    ${cabin.regularPrice}
                  </Text>
                )}
                <Text style={styles.perNightText}>/night</Text>
              </View>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.totalLabel}>TOTAL</Text>
              <Text style={styles.totalValue}>${totalPrice}</Text>
            </View>
            <Pressable style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  priceSummary: {
    backgroundColor: "rgba(25, 36, 48, 0.6)",
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,

    borderColor: "rgba(198, 154, 99, 0.25)",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 30,
    justifyContent: "space-between",

    borderTopWidth: 3,
  },
  nightsBlock: {
    alignItems: "center",
  },
  nightsCount: {
    fontSize: 28,
    color: "rgb(198, 154, 99)",
    fontWeight: "800",
    lineHeight: 30,
  },
  nightsLabel: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  divider: {
    width: 1,
    height: "80%",
    backgroundColor: "rgba(76, 107, 138, 0.3)",
  },
  priceBreakdown: {
    flex: 1,
  },
  priceRow: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceBreakdownLabel: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.55)",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 5,
  },
  priceRateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  priceBreakdownValue: {
    fontSize: 13,
    color: "#ffffff",
    fontWeight: "700",
  },
  originalPriceStrike: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.49)",
    textDecorationLine: "line-through",
    fontWeight: "400",
  },
  perNightText: {
    fontSize: 11,

    color: "rgba(255, 255, 255, 0.49)",
    fontWeight: "400",
  },
  totalLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.49)",

    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 5,
  },
  totalValue: {
    fontSize: 18,
    color: "rgb(198, 154, 99)",
    fontWeight: "800",
  },
  selectPrompt: {
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    backgroundColor: "rgba(198, 154, 99, 0.05)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(198, 154, 99, 0.1)",
    borderStyle: "dashed",
  },
  selectPromptText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.4)",
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: "rgb(198, 154, 99)",
    borderRadius: 50,
    width: 70,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});
