import { apiRefresh } from "@/api/apiAuth";
import { createBooking } from "@/api/apiBooking";
import { useWild } from "@/context/WildContext";
import { ICabins, IRESERVATION } from "@/utils/helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { SetStateAction } from "react";
import {
  Platform,
  Pressable,
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
  const paddingTop: number = Platform.OS === "android" ? 25 : 5;
  const { user, dispatch } = useWild();
  const router = useRouter();
  const handleSubmit = async () => {
    const newBooking: IRESERVATION = {
      ...reservationData!,
      numGuests: Number(
        String(reservationData?.numGuests).split(" ")[0] as unknown as number
      ),
    };

    try {
      const res = await createBooking(newBooking, cabin.id);
      const refresh = await apiRefresh();
      dispatch({ type: "USER_REFRESH", payload: refresh?.data?.user });
      await AsyncStorage.setItem("jwt", refresh?.data?.refresh_token);
      setReservationData({} as IRESERVATION);
      router.replace("/account/reservations");
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
    <View style={{ ...styles.view, paddingTop: paddingTop }}>
      <View style={styles.viewHeader}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>back</Text>
        </Pressable>
        <Text style={styles.logged}>Logged in as {user?.firstName}</Text>
      </View>
      <Text style={styles.text1}>How many guests?</Text>

      <Picker
        style={styles.picker}
        selectedValue={reservationData?.numGuests}
        onValueChange={(e) =>
          setReservationData((prev) => ({
            ...prev,
            numGuests: e,
          }))
        }
        mode="dialog"
      >
        <Picker.Item
          label="Select number of guests..."
          value="Select number of guests..."
          color="#222"
        />
        {Array.from({ length: +cabin?.maxCapacity }, (_, i) => (
          <Picker.Item
            key={i}
            label={`${i + 1} ${i + 1 > 1 ? "guests" : "guest"}`}
            value={`${i + 1} ${i + 1 > 1 ? "guests" : "guest"}`}
            color="#222"
          />
        ))}
      </Picker>
      <Text style={styles.text1}>Anything we should know about your stay?</Text>
      <TextInput
        style={styles.input}
        numberOfLines={7}
        value={reservationData?.observations}
        onChangeText={(text) =>
          setReservationData((prev) => ({ ...prev, observations: text }))
        }
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Pressable onPress={handleSubmit}>
        <Text style={styles.text}>Reverse Now</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: "rgb(244 236 225)",
    borderColor: "rgb(198 154 99)",
    overflow: "hidden",
    borderWidth: 1,
  },
  viewHeader: {
    display: "flex",
    flexDirection: "row",

    marginHorizontal: 20,
  },
  back: {
    fontSize: 16,
    fontWeight: "500",
    textTransform: "capitalize",
    width: "100%",
    letterSpacing: 1,
    zIndex: 99,
  },
  logged: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
    textTransform: "capitalize",
    marginHorizontal: "auto",
  },
  text1: {
    paddingLeft: 20,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
    textAlign: "center",
    padding: 10,
    backgroundColor: "rgb(198 154 99)",
  },
  input: {
    marginHorizontal: 20,
    borderColor: "#222",
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  picker: {
    marginHorizontal: 10,

    borderColor: "#222",
    borderWidth: 1,
    borderRadius: 20,
    height: 145,
    overflow: "hidden",
    marginBottom: 20,
  },
});
