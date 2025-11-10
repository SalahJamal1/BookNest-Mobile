import { ICabins } from "@/utils/helper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
type Props = { item: ICabins };

export default function CabinCard({ item }: Props) {
  return (
    <View style={styles.view}>
      <View style={styles.viewImage}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.view2}>
        <View style={styles.view3}>
          <Text style={styles.name}>Cabin {item.name}</Text>
          <View style={styles.view4}>
            <FontAwesome5 name="user-friends" size={15} color="#ddd" />
            <Text
              style={{
                fontSize: 13,
                color: "#ddd",
                fontWeight: "300",
              }}
            >
              For up to {item.maxCapacity} guests
            </Text>
          </View>
          <View style={styles.view5}>
            <Text style={styles.price}>
              $
              {item.discount > 0
                ? `${item.regularPrice - item.discount}`
                : `${item.regularPrice}`}
            </Text>
            {item.discount > 0 && (
              <Text style={styles.priceDiscount}>${item.regularPrice}</Text>
            )}
            <Text style={styles.night}>/ night</Text>
          </View>
        </View>
        <View style={styles.view6}>
          <Link href={`/(cabins)/${item.id}`} style={styles.link}>
            Details & reservation →
          </Link>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
    borderColor: "rgb(76 107 138)",
    borderWidth: 1,
  },
  view2: {
    flexGrow: 1,
  },
  view3: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  view4: {
    display: "flex",
    flexDirection: "row",
    gap: 7,
    marginBottom: 10,
  },
  view5: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    gap: 5,
  },
  view6: {
    display: "flex",
    alignItems: "flex-end",
    borderColor: "rgb(76 107 138)",
    borderTopWidth: 1,
  },
  viewImage: {
    position: "relative",
    flex: 1,
  },
  image: {
    height: "100%",
    width: "100%",
    position: "absolute",
    borderColor: "rgb(76 107 138)",
    borderRightWidth: 1,
  },
  name: {
    fontSize: 15,
    color: "rgb(198 154 99)",
    fontWeight: "500",
    marginBottom: 20,
    lineHeight: 15,
  },
  price: {
    fontSize: 15,
    color: "#ddd",
    fontWeight: "500",
    textAlign: "right",
  },
  priceDiscount: {
    fontSize: 12,
    color: "rgb(76 107 138)",
    fontWeight: "500",
    textAlign: "right",
    textDecorationLine: "line-through",
  },
  night: {
    fontSize: 15,
    color: "#ddd",
    fontWeight: "500",
    textAlign: "right",
  },
  link: {
    borderColor: "rgb(76 107 138)",
    fontWeight: "500",
    color: "#fff",
    borderLeftWidth: 1,
    padding: 10,
    backgroundColor: "rgb(198 154 99)",
  },
});
