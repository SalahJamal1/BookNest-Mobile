import { Link } from "expo-router";
import { ImageBackground, StyleSheet, Text } from "react-native";

export default function HomeScreen() {
  return (
    <ImageBackground
      source={require("@/assets/images/bg.png")}
      style={styles.image}
      resizeMode="cover"
    >
      <Text style={styles.text}>Welcome to Paradise</Text>

      <Link href="/account" style={styles.link}>
        Guest Area
      </Link>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: "#ffff",
    fontWeight: "700",
    fontSize: 24,
    letterSpacing: 2,
    marginBottom: 22,
  },
  link: {
    color: "#ffff",
    fontWeight: "700",
    backgroundColor: "rgb(198 154 99)",
    padding: 10,
    fontSize: 16,
    letterSpacing: 1,
  },
});
