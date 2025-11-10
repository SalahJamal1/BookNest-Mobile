import React from "react";
import { ImageBackground, StyleSheet, Text } from "react-native";

export default function About() {
  return (
    <ImageBackground
      source={require("@/assets/images/about-1.jpg")}
      style={styles.image}
      resizeMode="cover"
    >
      <Text style={styles.text}>Welcome to The Wild Oasis</Text>
      <Text style={styles.text2}>
        Where nature's beauty and comfortable living blend seamlessly. Hidden
        away in the heart of the Italian Dolomites, this is your paradise away
        from home. But it's not just about the luxury cabins. It's about the
        experience of reconnecting with nature and enjoying simple pleasures
        with family.
      </Text>
      <Text style={styles.text2}>
        Our 8 luxury cabins provide a cozy base, but the real freedom and peace
        you'll find in the surrounding mountains. Wander through lush forests,
        breathe in the fresh air, and watch the stars twinkle above from the
        warmth of a campfire or your hot tub.
      </Text>
      <Text style={styles.text2}>
        This is where memorable moments are made, surrounded by nature's
        splendor. It's a place to slow down, relax, and feel the joy of being
        together in a beautiful setting.
      </Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    color: "rgb(198 154 99)",
    fontWeight: "700",
    marginBottom: 50,
    paddingHorizontal: 20,
    backgroundColor: "rgb(19 28 36)",
    padding: 10,
  },
  text2: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "500",
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 40,
  },
});
