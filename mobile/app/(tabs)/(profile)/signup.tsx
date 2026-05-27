import { apiSignup } from "@/api/apiAuth";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await apiSignup(formData);
      router.push("/");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data.errors.ConfirmPassword.join(", ") ||
        error.message ||
        "Something went wrong, try again";
      Toast.show({ type: "error", text1: message, position: "top" });
    }
  };

  const Field = ({
    label,
    icon,
    placeholder,
    value,
    onChangeText,
    secure = false,
    showToggle = false,
    onToggle,
    keyboardType = "default",
    textContentType = "none",
  }: any) => (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputWrapper}>
        <FontAwesome5
          name={icon}
          size={13}
          color="rgba(255,255,255,0.35)"
          style={styles.inputIcon}
        />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="rgba(255,255,255,0.25)"
          style={[styles.input, showToggle && styles.inputPassword]}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={secure}
          keyboardType={keyboardType}
          textContentType={textContentType}
          value={value}
          onChangeText={onChangeText}
        />
        {showToggle && (
          <Pressable onPress={onToggle} style={styles.eyeButton}>
            <Ionicons
              name={secure ? "eye-outline" : "eye-off-outline"}
              size={18}
              color="rgba(255,255,255,0.4)"
            />
          </Pressable>
        )}
      </View>
    </View>
  );

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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join us and book your first luxury cabin experience
          </Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          {/* Name Row */}
          <View style={styles.nameRow}>
            <View style={[styles.fieldGroup, { flex: 1 }]}>
              <Text style={styles.fieldLabel}>First Name</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="John"
                  placeholderTextColor="rgba(255,255,255,0.25)"
                  style={styles.input}
                  autoCapitalize="words"
                  autoCorrect={false}
                  textContentType="givenName"
                  value={formData.firstName}
                  onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                />
              </View>
            </View>
            <View style={[styles.fieldGroup, { flex: 1 }]}>
              <Text style={styles.fieldLabel}>Last Name</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="Doe"
                  placeholderTextColor="rgba(255,255,255,0.25)"
                  style={styles.input}
                  autoCapitalize="words"
                  autoCorrect={false}
                  textContentType="familyName"
                  value={formData.lastName}
                  onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                />
              </View>
            </View>
          </View>

          <Field
            label="Email Address"
            icon="envelope"
            placeholder="john@example.com"
            value={formData.email}
            onChangeText={(text: string) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            textContentType="emailAddress"
          />

          <Field
            label="Password"
            icon="lock"
            placeholder="Choose a strong password"
            value={formData.password}
            onChangeText={(text: string) => setFormData({ ...formData, password: text })}
            secure={!showPassword}
            showToggle
            onToggle={() => setShowPassword(!showPassword)}
            textContentType="newPassword"
          />

          <Field
            label="Confirm Password"
            icon="lock"
            placeholder="Repeat your password"
            value={formData.confirmPassword}
            onChangeText={(text: string) => setFormData({ ...formData, confirmPassword: text })}
            secure={!showConfirmPassword}
            showToggle
            onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
            textContentType="newPassword"
          />

          {/* Sign In Link */}
          <Link href="/(tabs)/(profile)/login" asChild>
            <Pressable style={styles.switchLink}>
              <Text style={styles.switchText}>
                Already have an account?{" "}
                <Text style={styles.switchTextHighlight}>Sign in</Text>
              </Text>
            </Pressable>
          </Link>
        </View>

        {/* Submit Button */}
        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Create Account</Text>
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
    marginBottom: 28,
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
    gap: 2,
  },
  nameRow: {
    flexDirection: "row",
    gap: 12,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.45)",
    fontWeight: "600",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 7,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 30, 0.8)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(76, 107, 138, 0.3)",
    paddingHorizontal: 14,
    height: 48,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#ffffff",
    fontSize: 14,
    height: "100%",
  },
  inputPassword: {
    paddingRight: 8,
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
