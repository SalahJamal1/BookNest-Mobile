import { apiLogin } from "@/api/apiAuth";
import { useWild } from "@/context/WildContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";

import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

export type IUSERLOGIN = {
  email: string;
  password: string;
};
export default function Login() {
  const [fromDate, setFromDate] = useState<IUSERLOGIN>({
    email: "",
    password: "",
  });

  const { dispatch } = useWild();
  const router = useRouter();

  const isValid = (): boolean => {
    const tempError: Record<string, string> = {};
    if (!fromDate.email.trim()) tempError.email = "Email is required";
    if (!fromDate.password.trim()) tempError.password = "Password is required";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(fromDate.email) && fromDate.email)
      tempError.email = "Email is invalid";
    const message = Object.values(tempError).join(", ");
    if (message.length > 0) {
      Toast.show({
        type: "error",
        text1: message,
        position: "top",
      });
    }
    return Object.keys(tempError).length === 0;
  };

  const handleSubmit = async () => {
    if (!isValid()) return;
    try {
      const res = await apiLogin(fromDate);
      AsyncStorage.setItem("jwt", res?.data?.refresh_token);
      AsyncStorage.setItem("deviceId", res?.data?.deviceId);
      dispatch({ type: "USER_LOGIN", payload: res.data.user });
      router.push("/");
    } catch (error: any) {
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
    <>
      <View style={styles.view}>
        <Text style={styles.title}>Ready to order? Let's go!</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="John@example.com"
          placeholderTextColor={"#888"}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
          keyboardType="email-address"
          value={fromDate.email}
          onChangeText={(e) => setFromDate({ ...fromDate, email: e })}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Password"
          placeholderTextColor={"#888"}
          style={styles.input}
          secureTextEntry={true}
          textContentType="password"
          autoCapitalize="none"
          autoCorrect={false}
          value={fromDate.password}
          onChangeText={(e) => setFromDate({ ...fromDate, password: e })}
        />

        <Link href="/account/signup" style={styles.signup}>
          Create Account
        </Link>
      </View>
      <Pressable style={styles.login} onPress={handleSubmit}>
        <Text style={styles.text}>Login</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    paddingTop: 15,
    letterSpacing: 3,
    fontWeight: "700",
  },
  label: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 5,
    marginTop: 5,
  },
  error: {
    marginTop: 5,
    color: "red",
    marginBottom: 5,
    fontSize: 16,
  },
  login: {
    backgroundColor: "rgb(198 154 99)",
    width: "100%",
    height: 70,
    bottom: 0,
    position: "static",
  },
  signup: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: "rgb(198 154 99)",
    borderRadius: 7,
    padding: 5,
    marginTop: 10,
    alignSelf: "flex-start",
    color: "#fff",
  },
  input: {
    color: "#fff",
    borderWidth: 1,
    borderColor: "rgb(76 107 138)",
    height: 45,
    borderRadius: 7,
    paddingHorizontal: 7,
    fontSize: 18,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 20,
  },
  view: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: "rgb(19 28 36)",
    display: "flex",
  },
});
