import { apiSignup } from "@/api/apiAuth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

type IUSERREGISTER = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};
export default function Signup() {
  const [formData, setFormData] = useState<IUSERREGISTER>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      const res = await apiSignup(formData);
      router.push("/");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data.errors.ConfirmPassword.join(", ") ||
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
        <ScrollView>
          <View>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              placeholder="First Name"
              style={styles.input}
              textContentType="name"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor={"#888"}
              value={formData.firstName}
              onChangeText={(text) =>
                setFormData({ ...formData, firstName: text })
              }
            />

            <Text style={styles.label}>Last Name</Text>
            <TextInput
              placeholder="Last Name"
              style={styles.input}
              textContentType="name"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor={"#888"}
              value={formData.lastName}
              onChangeText={(text) =>
                setFormData({ ...formData, lastName: text })
              }
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="John@example.com"
              style={styles.input}
              textContentType="emailAddress"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              autoCorrect={false}
              placeholderTextColor={"#888"}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholderTextColor={"#888"}
              placeholder="Password"
              style={styles.input}
              secureTextEntry={true}
              textContentType="password"
              autoCapitalize="none"
              autoCorrect={false}
              value={formData.password}
              onChangeText={(text) =>
                setFormData({ ...formData, password: text })
              }
            />

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              placeholderTextColor={"#888"}
              placeholder="Confirm Password"
              style={styles.input}
              secureTextEntry={true}
              textContentType="password"
              autoCapitalize="none"
              autoCorrect={false}
              value={formData.confirmPassword}
              onChangeText={(text) =>
                setFormData({ ...formData, confirmPassword: text })
              }
            />
          </View>
        </ScrollView>
      </View>
      <Pressable style={styles.signup} onPress={handleSubmit}>
        <Text style={styles.text}> Create Account</Text>
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
    marginTop: 10,
  },
  error: {
    marginTop: 5,
    color: "red",

    fontSize: 16,
  },
  signup: {
    width: "100%",
    height: 70,
    bottom: 0,
    backgroundColor: "rgb(198 154 99)",
    position: "static",
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
    marginBottom: 10,
  },
  view: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 30,
    backgroundColor: "rgb(19 28 36)",
  },
});
