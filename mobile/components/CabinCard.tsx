import { ICabins } from "@/utils/helper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Link } from "expo-router";
import { useEffect } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  useAnimatedValue,
  View,
} from "react-native";

type Props = { item: ICabins };

export default function CabinCard({ item }: Props) {
  const finalPrice =
    item.discount > 0 ? item.regularPrice - item.discount : item.regularPrice;
  const anim = useAnimatedValue(0);
  useEffect(() => {
    anim.setValue(0);
    Animated.timing(anim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 1000,
    }).start();
  }, [anim]);

  const opacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const scale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const blur = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 0],
  });
  return (
    <Animated.View style={[styles.card, { opacity, transform: [{ scale }] }]}>
      {/* Cabin Image Container with Badge Overlay */}
      <View style={styles.imageContainer}>
        <Animated.Image
          source={{ uri: item.image }}
          style={[styles.image, { opacity }]}
          resizeMode="cover"
          blurRadius={blur}
        />
        {/* Guest capacity badge overlay */}
        <View style={styles.capacityBadge}>
          <FontAwesome5 name="users" size={10} color="rgb(198, 154, 99)" />
          <Text style={styles.capacityBadgeText}>Up to {item.maxCapacity}</Text>
        </View>
      </View>

      {/* Cabin Details Section */}
      <View style={styles.detailsContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.name} numberOfLines={1}>
            Cabin {item.name}
          </Text>
          {item.discount > 0 && (
            <View style={styles.discountTag}>
              <Text style={styles.discountTagText}>Save ${item.discount}</Text>
            </View>
          )}
        </View>

        {/* Pricing Layout */}
        <View style={styles.bottomRow}>
          <View style={styles.priceBlock}>
            <Text style={styles.priceLabel}>PER NIGHT</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${finalPrice}</Text>
              {item.discount > 0 && (
                <Text style={styles.originalPrice}>${item.regularPrice}</Text>
              )}
            </View>
          </View>

          {/* Luxury CTA Button */}
          <Link href={`/(cabins)/${item.id}`} asChild>
            <Pressable style={styles.ctaButton}>
              <Text style={styles.ctaText}>Book</Text>
              <FontAwesome5 name="chevron-right" size={10} color="#15171a" />
            </Pressable>
          </Link>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(25, 36, 48, 0.6)", // Sleek dark card background
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(76, 107, 138, 0.2)",
    flexDirection: "row",
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    width: 125,
    height: 125,
    position: "relative",
    backgroundColor: "rgba(15, 23, 30, 0.5)",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  capacityBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(15, 23, 30, 0.85)", // Semi-transparent obsidian
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(198, 154, 99, 0.3)",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  capacityBadgeText: {
    color: "rgb(198, 154, 99)",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  detailsContainer: {
    flex: 1,
    padding: 14,
    justifyContent: "space-between",
  },
  headerRow: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
  },
  name: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  discountTag: {
    backgroundColor: "rgba(198, 154, 99, 0.15)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(198, 154, 99, 0.3)",
  },
  discountTagText: {
    color: "rgb(218, 174, 119)",
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  priceBlock: {
    flexDirection: "column",
  },
  priceLabel: {
    fontSize: 8,
    color: "rgba(255, 255, 255, 0.4)",
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 2,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  price: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "800",
  },
  originalPrice: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.4)",
    textDecorationLine: "line-through",
    fontWeight: "400",
  },
  ctaButton: {
    backgroundColor: "rgb(198, 154, 99)", // Amber Gold
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    shadowColor: "rgb(198, 154, 99)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  ctaText: {
    color: "#15171a", // High contrast dark text
    fontSize: 12,
    fontWeight: "700",
  },
});
