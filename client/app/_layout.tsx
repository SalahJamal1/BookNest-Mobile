import WildContext from "@/context/WildContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "green",

        flexWrap: "wrap",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1NumberOfLines={0}
      text2NumberOfLines={0}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 13,
        textAlign: "center",
      }}
      text1NumberOfLines={0}
      text2NumberOfLines={0}
      style={{
        borderLeftColor: "red",
        marginTop: 50,
        flexWrap: "wrap",
        maxWidth: "90%",
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
};
export default function RootLayout() {
  return (
    <WildContext>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="account/index"
          options={{
            title: "Guest Area",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "rgb(19 28 36)",
            },

            headerBackTitle: "Back",
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="account/login"
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
          name="account/reservations"
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
          name="account/signup"
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
          name="+not-found"
          options={{
            title: "Sorry !!",
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style="light" />
      <Toast config={toastConfig} />
    </WildContext>
  );
}
