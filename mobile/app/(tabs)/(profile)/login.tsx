import { apiLogin } from "@/api/apiAuth";
import { useWild } from "@/context/WildContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
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
  const [showPassword, setShowPassword] = useState(false);
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
      Toast.show({ type: "error", text1: message, position: "top" });
    }
    return Object.keys(tempError).length === 0;
  };

  const handleSubmit = async () => {
    if (!isValid()) return;
    try {
      const res = await apiLogin(fromDate);
      await AsyncStorage.setItem("jwt", res?.data?.refresh_token);
      await AsyncStorage.setItem("deviceId", res?.data?.deviceId);
      dispatch({ type: "USER_LOGIN", payload: res.data.user });
      router.push("/");
      Toast.show({
        type: "success",
        text1: "Logged in successfully",
        position: "top",
      });
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong, try again";
      Toast.show({ type: "error", text1: message, position: "top" });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.brand}>BOOKNEST</Text>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Sign in to manage your cabin reservations
          </Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          {/* Email Field */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <FontAwesome5
                name="envelope"
                size={14}
                color="rgba(255,255,255,0.35)"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="john@example.com"
                placeholderTextColor="rgba(255,255,255,0.25)"
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                keyboardType="email-address"
                value={fromDate.email}
                onChangeText={(e) => setFromDate({ ...fromDate, email: e })}
              />
            </View>
          </View>

          {/* Password Field */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Password</Text>
            <View style={styles.inputWrapper}>
              <FontAwesome5
                name="lock"
                size={14}
                color="rgba(255,255,255,0.35)"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Your password"
                placeholderTextColor="rgba(255,255,255,0.25)"
                style={[styles.input, styles.inputPassword]}
                secureTextEntry={!showPassword}
                textContentType="password"
                autoCapitalize="none"
                autoCorrect={false}
                value={fromDate.password}
                onChangeText={(e) => setFromDate({ ...fromDate, password: e })}
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={18}
                  color="rgba(255,255,255,0.4)"
                />
              </Pressable>
            </View>
          </View>

          {/* Create Account Link */}
          <Link href="/(tabs)/(profile)/signup" asChild>
            <Pressable style={styles.switchLink}>
              <Text style={styles.switchText}>
                Don't have an account?{" "}
                <Text style={styles.switchTextHighlight}>Create one</Text>
              </Text>
            </Pressable>
          </Link>
        </View>

        {/* Submit Button */}
        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Sign In</Text>
          <FontAwesome5 name="arrow-right" size={13} color="#15171a" />
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(15, 23, 30)",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
  },
  brand: {
    fontSize: 11,
    color: "rgb(198, 154, 99)",
    fontWeight: "700",
    letterSpacing: 2.5,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    color: "#ffffff",
    fontWeight: "800",
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.45)",
    lineHeight: 20,
  },
  card: {
    backgroundColor: "rgba(25, 36, 48, 0.5)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(76, 107, 138, 0.2)",
    padding: 20,
    marginBottom: 20,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  fieldLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    fontWeight: "600",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 30, 0.8)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(76, 107, 138, 0.3)",
    paddingHorizontal: 14,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#ffffff",
    fontSize: 15,
    height: "100%",
  },
  inputPassword: {
    paddingRight: 10,
  },
  eyeButton: {
    padding: 4,
  },
  switchLink: {
    marginTop: 4,
  },
  switchText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.4)",
  },
  switchTextHighlight: {
    color: "rgb(198, 154, 99)",
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: "rgb(198, 154, 99)",
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    shadowColor: "rgb(198, 154, 99)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  submitText: {
    color: "#15171a",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});
