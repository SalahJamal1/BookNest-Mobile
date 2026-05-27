import { apiRefresh } from "@/api/apiAuth";
import { createBooking } from "@/api/apiBooking";
import { useWild } from "@/context/WildContext";
import { ICabins, IRESERVATION } from "@/utils/helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { SetStateAction } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

type Props = {
  cabin: ICabins;
  setReservationData: (value: SetStateAction<IRESERVATION>) => void;
  reservationData?: IRESERVATION;
};

export default function ReservationForm({
  cabin,
  setReservationData,
  reservationData,
}: Props) {
  const { user, dispatch } = useWild();
  const router = useRouter();

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
        topOffset: 0,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Guests Section */}
      <View style={styles.section}>
        <View style={styles.sectionTitleRow}>
          <FontAwesome5 name="users" size={13} color="rgb(198, 154, 99)" />
          <Text style={styles.sectionLabel}>Number of Guests</Text>
        </View>
        <View style={styles.pickerWrapper}>
          <Picker
            style={styles.picker}
            itemStyle={{ color: "#fff" }}
            selectedValue={reservationData?.numGuests}
            onValueChange={(e) =>
              setReservationData((prev) => ({
                ...prev,
                numGuests: e,
              }))
            }
            mode="dropdown"
            dropdownIconColor="rgb(198, 154, 99)"
            selectionColor={"rgb(198, 154, 99)"}
          >
            <Picker.Item
              label="Select number of guests..."
              value="Select number of guests..."
              color="#fff"
              style={{ color: "#fff" }}
            />
            {Array.from({ length: +cabin?.maxCapacity }, (_, i) => (
              <Picker.Item
                key={i}
                label={`${i + 1} ${i + 1 > 1 ? "guests" : "guest"}`}
                value={`${i + 1} ${i + 1 > 1 ? "guests" : "guest"}`}
                color="#fff"
              />
            ))}
          </Picker>
        </View>
      </View>

      {/* Notes Section */}
      <View style={styles.section}>
        <View style={styles.sectionTitleRow}>
          <FontAwesome5
            name="sticky-note"
            size={13}
            color="rgb(198, 154, 99)"
          />
          <Text style={styles.sectionLabel}>Special Requests</Text>
        </View>
        <TextInput
          style={styles.input}
          numberOfLines={5}
          multiline
          value={reservationData?.observations}
          onChangeText={(text) =>
            setReservationData((prev) => ({ ...prev, observations: text }))
          }
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Anything we should know about your stay?"
          placeholderTextColor="rgba(255, 255, 255, 0.46)"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "rgb(15, 23, 30)",
  },

  section: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  sectionLabel: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  pickerWrapper: {
    backgroundColor: "rgba(25, 36, 48, 0.7)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(76, 107, 138, 0.3)",
    overflow: "hidden",
  },
  picker: {
    height: 140,
    color: Platform.OS === "android" ? "#fff" : "#fff",
  },
  input: {
    backgroundColor: "rgba(25, 36, 48, 0.5)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(76, 107, 138, 0.3)",
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: "#ffffff",
    fontSize: 14,
    lineHeight: 20,
    textAlignVertical: "top",
    minHeight: 110,
  },
});
