import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function NotFound() {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>We Cannot found The Page</Text>
      <Link href="/" style={styles.link}>
        Back To Home
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(19 28 36)",
  },
  text: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
  },
  link: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    backgroundColor: "rgb(198 154 99)",
    padding: 10,
  },
});
