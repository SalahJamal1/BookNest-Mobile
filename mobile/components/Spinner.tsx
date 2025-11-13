import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet } from "react-native";
import Loading from "./Loading";

export default function Spinner() {
  return (
    <BlurView style={styles.view}>
      <Loading />
    </BlurView>
  );
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(19 28 36)",
  },
});
