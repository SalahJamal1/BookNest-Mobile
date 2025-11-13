import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function ReservationMessage() {
  return (
    <View style={styles.view}>
      <Link href="/cabins" style={styles.link}>
        Ready for a Getaway? Let’s Explore Our Cabins!
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "rgb(19 28 36)",
    paddingTop: 60,
    alignItems: "center",
  },
  link: {
    color: "#ffff",
    fontWeight: "700",
    backgroundColor: "rgb(198 154 99)",
    padding: 10,
    fontSize: 16,
    letterSpacing: 1,
    textAlign: "center",
  },
});
