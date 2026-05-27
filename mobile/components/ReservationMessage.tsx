import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ReservationMessage() {
  return (
    <View style={styles.container}>
      {/* Empty State Icon */}
      <View style={styles.iconWrap}>
        <FontAwesome5 name="calendar-times" size={36} color="rgba(198, 154, 99, 0.4)" />
      </View>
      <Text style={styles.title}>No Reservations Yet</Text>
      <Text style={styles.subtitle}>
        You haven't booked any cabins yet. Explore our luxury collection and
        find your perfect escape.
      </Text>
      <Link href="/cabins" asChild>
        <Pressable style={styles.button}>
          <FontAwesome5 name="bed" size={14} color="#15171a" />
          <Text style={styles.buttonText}>Explore Cabins</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(15, 23, 30)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 36,
  },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(198, 154, 99, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(198, 154, 99, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    color: "#ffffff",
    fontWeight: "800",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.4)",
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 28,
  },
  button: {
    backgroundColor: "rgb(198, 154, 99)",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    shadowColor: "rgb(198, 154, 99)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "#15171a",
    fontSize: 15,
    fontWeight: "800",
  },
});
