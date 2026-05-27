import { apiRefresh } from "@/api/apiAuth";
import { createBooking } from "@/api/apiBooking";
import { useWild } from "@/context/WildContext";
import { calcDate, ICabins, IRESERVATION } from "@/utils/helper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { SetStateAction, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";

type Props = {
  cabin: ICabins;
  setReservationData: (value: SetStateAction<IRESERVATION>) => void;
  reservationData?: IRESERVATION;
  totalPrice: number;
  numNights: number | null;
  hasRange: DateType;
};

export function DatePicker({
  cabin,
  reservationData,
  setReservationData,
  totalPrice,
  numNights,
  hasRange,
}: Props) {
  const defaultStyles = useDefaultStyles();

  useEffect(() => {
    setReservationData((prev) => ({
      ...prev,
      totalPrice,
      numNights: numNights ?? 0,
    }));
  }, [totalPrice, numNights, setReservationData]);

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Select Your Dates</Text>
        {hasRange && (
          <Pressable
            style={styles.clearBtn}
            onPress={() =>
              setReservationData((prev) => ({
                ...prev,
                startDate: undefined,
                endAt: undefined,
              }))
            }
          >
            <FontAwesome5
              name="times"
              size={10}
              color="rgba(255,255,255,0.6)"
            />
            <Text style={styles.clearText}>Clear</Text>
          </Pressable>
        )}
      </View>

      {/* Calendar */}
      <View style={[styles.calendarCard, { marginBottom: hasRange ? 90 : 5 }]}>
        <DateTimePicker
          style={styles.picker}
          mode="range"
          startDate={reservationData?.startDate}
          endDate={reservationData?.endAt}
          onChange={({ startDate, endDate }) =>
            setReservationData((prev) => ({
              ...prev,
              startDate,
              endAt: endDate,
            }))
          }
          styles={{
            ...defaultStyles,
            day_label: { color: "#1a2636" },
            day_cell: { padding: 0, color: "#1a2636" },
            selected: {
              borderRadius: 50,
              backgroundColor: "rgb(15, 23, 30)",
              color: "#fff",
            },
            range_fill: {
              backgroundColor: "rgba(198, 154, 99, 0.25)",
              color: "#1a2636",
            },
            range_end_label: { color: "#fff" },
            range_start_label: { color: "#fff" },
            month_label: { color: "#1a2636", fontWeight: "700" },
          }}
          min={1}
          max={6}
        />
      </View>

      {/* Price Summary Bar */}
      {!hasRange && (
        <View style={styles.selectPrompt}>
          <FontAwesome5
            name="calendar-alt"
            size={14}
            color="rgba(198, 154, 99, 0.6)"
          />
          <Text style={styles.selectPromptText}>
            Select check-in and check-out dates above
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 15,
    color: "#ffffff",
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  clearBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  clearText: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "600",
  },
  calendarCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(198, 154, 99, 0.2)",
  },
  picker: {
    backgroundColor: "rgb(240, 233, 222)",
    paddingHorizontal: 4,
  },
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
    color: "rgba(255, 255, 255, 0.95)",
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
