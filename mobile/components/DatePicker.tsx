import { calcDate, ICabins, IRESERVATION } from "@/utils/helper";
import { SetStateAction, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePicker, { useDefaultStyles } from "react-native-ui-datepicker";

type Props = {
  cabin: ICabins;
  setReservationData: (value: SetStateAction<IRESERVATION>) => void;
  reservationData?: IRESERVATION;
};

export function DatePicker({
  cabin,
  reservationData,
  setReservationData,
}: Props) {
  const defaultStyles = useDefaultStyles();

  const numNights: number | null = calcDate(
    reservationData?.startDate,
    reservationData?.endAt
  );
  const totalPrice: number =
    (numNights && numNights * (cabin.regularPrice - cabin.discount)) ?? 0;
  useEffect(() => {
    setReservationData((prev) => ({
      ...prev,
      totalPrice,
      numNights: numNights ?? 0,
    }));
  }, [totalPrice, numNights, setReservationData]);
  return (
    <View style={styles.view}>
      <DateTimePicker
        style={styles.picker}
        mode="range"
        startDate={reservationData?.startDate}
        endDate={reservationData?.endAt}
        onChange={({ startDate, endDate }) =>
          setReservationData((prev) => ({ ...prev, startDate, endAt: endDate }))
        }
        styles={{
          ...defaultStyles,
          day_label: { color: "#222" },
          day_cell: { padding: 0, color: "#222" },
          selected: {
            borderRadius: 50,
            backgroundColor: "rgb(19 28 36)",
            color: "#fff",
          },
          range_fill: { backgroundColor: "rgb(198 154 99)", color: "#fff" },

          range_end_label: { color: "#fff" },
          range_start_label: { color: "#fff" },
          month_label: { color: "#222" },
        }}
        min={1}
        max={6}
      />
      <View style={styles.view1}>
        <View style={styles.view2}>
          <Text style={styles.text}>
            $
            {cabin.discount > 0
              ? `${cabin.regularPrice - cabin.discount}`
              : `${cabin.regularPrice}`}
          </Text>
          {cabin.discount > 0 && (
            <Text style={styles.price}>${cabin.regularPrice}</Text>
          )}
          <Text style={styles.night}>
            /{" "}
            {reservationData?.startDate &&
              reservationData?.endAt &&
              `x${numNights}`}{" "}
            night
          </Text>
        </View>

        {reservationData?.startDate && reservationData?.endAt && (
          <Text style={styles.total}>Total ${totalPrice}</Text>
        )}
        {reservationData?.startDate && reservationData?.endAt && (
          <Pressable
            onPress={() =>
              setReservationData((prev) => ({
                ...prev,
                startDate: undefined,
                endAt: undefined,
              }))
            }
          >
            <Text style={styles.text2}>Clear</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    marginVertical: 2,
  },
  view1: {
    backgroundColor: "rgb(198 154 99)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: 40,
  },
  view2: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  text: {
    fontSize: 15,
    color: "rgb(19 28 36)",
    fontWeight: "500",
    textAlign: "right",
  },
  text2: {
    fontSize: 15,
    color: "rgb(19 28 36)",
    fontWeight: "500",
    textAlign: "right",
    borderColor: "#ddd",
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
  price: {
    fontSize: 12,
    color: "rgb(76 107 138)",
    fontWeight: "500",

    textDecorationLine: "line-through",
    marginTop: 3.5,
  },
  total: {
    fontSize: 15,
    color: "rgb(19 28 36)",
    fontWeight: "500",
    textAlign: "right",
  },
  night: {
    fontSize: 15,
    color: "rgb(19 28 36)",
    fontWeight: "500",
    textAlign: "right",
  },
  picker: {
    backgroundColor: "rgb(244 236 225)",
  },
});
