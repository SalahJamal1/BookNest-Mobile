import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  error: string;
};

export default function Error({ error }: Props) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(19 28 36)",
      }}
    >
      <Text style={styles.text}>{error}</Text>
      <Link style={styles.link} href="/">
        go home
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
    lineHeight: 22,
    marginBottom: 25,
  },
  link: {
    color: "#ffff",
    fontWeight: "700",
    backgroundColor: "rgb(198 154 99)",
    padding: 10,
    fontSize: 16,
    letterSpacing: 1,
    textTransform: "capitalize",
  },
});
