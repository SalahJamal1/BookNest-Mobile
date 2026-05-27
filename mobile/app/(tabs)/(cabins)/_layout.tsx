import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useWild } from "@/context/WildContext";

export default function CabinLayout() {
  const router = useRouter();
  const { cabin, user } = useWild();
  return (
    <Stack
      screenOptions={{
        animation: "fade_from_bottom",
      }}
    >
      <Stack.Screen name="[cabinId]" options={{ headerShown: false }} />
      <Stack.Screen
        name="cabin-reserve"
        options={{
          header() {
            return (
              <View style={styles.header}>
                <Pressable
                  style={styles.backButton}
                  onPress={() => router.back()}
                >
                  <Ionicons name="chevron-back" size={20} color="#ffffff" />
                </Pressable>
                <View style={styles.headerCenter}>
                  <Text style={styles.headerTitle}>Reserve Cabin</Text>
                  <Text style={styles.headerSubtitle}>Cabin {cabin.name}</Text>
                </View>
                <View style={styles.userPill}>
                  <FontAwesome5
                    name="user"
                    size={11}
                    color="rgb(198, 154, 99)"
                  />
                  <Text style={styles.userPillText}>{user?.firstName}</Text>
                </View>
              </View>
            );
          },
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    backgroundColor: "rgb(15, 23, 30)",
    paddingTop: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 12,
    paddingBottom: 7,
    borderBottomColor: "rgba(76, 107, 138, 0.2)",
    borderBottomWidth: 1,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  headerCenter: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 17,
    color: "#ffffff",
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "rgb(198, 154, 99)",
    fontWeight: "500",
    marginTop: 1,
  },
  userPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(198, 154, 99, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(198, 154, 99, 0.25)",
  },
  userPillText: {
    fontSize: 12,
    color: "rgb(198, 154, 99)",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(76, 107, 138, 0.2)",
    marginHorizontal: 20,
  },
});
