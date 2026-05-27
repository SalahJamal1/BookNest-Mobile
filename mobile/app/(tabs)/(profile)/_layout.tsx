import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerStyle: {
            backgroundColor: "rgb(19 28 36)",
          },
          headerBackTitle: "Back",
          headerTintColor: "#fff",
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerStyle: {
            backgroundColor: "rgb(19 28 36)",
          },
          headerBackTitle: "Back",
          headerTintColor: "#fff",
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="reservations"
        options={{
          headerStyle: {
            backgroundColor: "rgb(19 28 36)",
          },
          headerBackTitle: "Back",
          headerTintColor: "#fff",
          headerTitle: "",
        }}
      />
    </Stack>
  );
}
