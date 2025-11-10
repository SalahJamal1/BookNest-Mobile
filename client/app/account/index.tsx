import { apiLogout } from "@/api/apiAuth";
import { useWild } from "@/context/WildContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function Account() {
  const { auth, dispatch } = useWild();
  const handleLogout = async () => {
    try {
      const res = await apiLogout();
      dispatch({ type: "USER_LOGOUT" });
      AsyncStorage.removeItem("jwt");
    } catch (error: any) {
      console.log(error);
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong, try again";
      Toast.show({
        type: "error",
        text1: message,
        position: "top",
      });
    }
  };
  return (
    <View
      style={{
        borderColor: "rgb(76 107 138)",
        backgroundColor: "rgb(19 28 36)",
        paddingVertical: 10,
        flex: 1,
      }}
    >
      <View
        style={{
          borderColor: "rgb(76 107 138)",
          paddingBottom: 10,
          borderBottomWidth: 1,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "rgb(198 154 99)",
            fontWeight: "700",
            marginBottom: 10,
            marginHorizontal: 20,
          }}
        >
          Our Luxury Cabins
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: "#fff",
            fontWeight: "300",
            lineHeight: 16,
            marginLeft: 20,
            maxWidth: 370,
          }}
        >
          Cozy yet luxurious cabins, located right in the heart of the Italian
          Dolomites. Imagine waking up to beautiful mountain views, spending
          your days exploring the dark forests around, or just relaxing in your
          private hot tub under the stars. Enjoy nature's beauty in your own
          little home away from home. The perfect spot for a peaceful, calm
          vacation. Welcome to paradise.
        </Text>
      </View>
      {auth ? (
        <>
          <Link
            href="/account/reservations"
            style={{
              fontSize: 16,
              fontWeight: "500",

              color: "#fff",
              lineHeight: 16,
              marginLeft: 20,
              marginBottom: 20,
            }}
          >
            Reservations
          </Link>
          <Pressable onPress={handleLogout}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: "#fff",
                lineHeight: 16,
                marginLeft: 20,
              }}
            >
              Logout
            </Text>
          </Pressable>
        </>
      ) : (
        <>
          <Link
            href="/account/login"
            style={{
              fontSize: 16,
              fontWeight: "500",

              color: "#fff",
              lineHeight: 16,
              marginLeft: 20,
              marginBottom: 20,
            }}
          >
            Login
          </Link>
          <Link
            href="/account/signup"
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "#fff",
              lineHeight: 16,
              marginLeft: 20,
            }}
          >
            Register
          </Link>
        </>
      )}
    </View>
  );
}
