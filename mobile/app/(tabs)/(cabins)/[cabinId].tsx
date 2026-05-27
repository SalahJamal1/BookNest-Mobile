import Error from "@/components/Error";
import Spinner from "@/components/Spinner";
import TextEditor from "@/components/TextEditor";
import { useWild } from "@/context/WildContext";
import useCabins from "@/hooks/useCabins";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useAnimatedValue,
  View,
} from "react-native";

export default function Cabin() {
  const { cabin, auth, dispatch, error, loader } = useWild();
  const { cabinId } = useLocalSearchParams();
  const { fetchCabin } = useCabins();
  const router = useRouter();
  const anim = useAnimatedValue(0);

  useEffect(() => {
    if (!cabinId) return;
    fetchCabin(+cabinId, dispatch);
  }, [fetchCabin, cabinId, dispatch]);

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

  const blur = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 0],
  });
  if (loader && !cabin) return <Spinner />;
  if (error) return <Error error={error} />;
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {/* Immersive Image Header */}
        <View style={styles.imageWrapper}>
          <Animated.Image
            source={{ uri: cabin.image }}
            style={[styles.image, { opacity }]}
            resizeMode="cover"
            blurRadius={blur}
          />
          {/* Custom Floating Back Button */}
          <Pressable
            style={styles.backButton}
            onPress={() => router.push("/(tabs)/cabins")}
          >
            <Ionicons name="chevron-back" size={22} color="#ffffff" />
          </Pressable>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          <Text style={styles.brand}>LUXURY SANCTUARY</Text>
          <Text style={styles.title}>Cabin {cabin.name}</Text>

          {/* Premium Specs Grid */}
          <View style={styles.specsGrid}>
            <View style={styles.specCard}>
              <FontAwesome5 name="users" size={16} color="rgb(198, 154, 99)" />
              <Text style={styles.specLabel}>Capacity</Text>
              <Text style={styles.specValue}>{cabin.maxCapacity} Guests</Text>
            </View>
            <View style={styles.specCard}>
              <Entypo
                name="eye-with-line"
                size={16}
                color="rgb(198, 154, 99)"
              />
              <Text style={styles.specLabel}>Privacy</Text>
              <Text style={styles.specValue}>100% Guaranteed</Text>
            </View>
          </View>

          {/* Description Section */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>About this cabin</Text>
            <TextEditor description={cabin.description} />
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom CTA Action Bar */}
      <View style={styles.ctaBar}>
        <View style={styles.priceCol}>
          <Text style={styles.ctaPriceLabel}>PER NIGHT</Text>
          <Text style={styles.ctaPrice}>
            $
            {cabin.discount > 0
              ? cabin.regularPrice - cabin.discount
              : cabin.regularPrice}
          </Text>
        </View>
        <Link
          href={
            auth
              ? `/cabin-reserve?cabinId=${cabin.id}`
              : "/(tabs)/(profile)/login"
          }
          asChild
        >
          <Pressable style={styles.reserveButton}>
            <Text style={styles.reserveButtonText}>
              {auth ? "Reserve" : "Login & Book"}
            </Text>
            <FontAwesome5 name="arrow-right" size={12} color="#15171a" />
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(15, 23, 30)", // Rich dark slate/obsidian
  },
  scrollView: {
    flex: 1,
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    height: 340,
    backgroundColor: "rgba(15, 23, 30, 0.5)",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(15, 23, 30, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 100, // Safe space for absolute bottom bar
  },
  brand: {
    fontSize: 11,
    color: "rgb(198, 154, 99)",
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 4,
  },
  title: {
    fontSize: 30,
    color: "#ffffff",
    fontWeight: "800",
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  specsGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 28,
  },
  specCard: {
    flex: 1,
    backgroundColor: "rgba(25, 36, 48, 0.5)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(76, 107, 138, 0.2)",
    padding: 14,
    alignItems: "flex-start",
    gap: 6,
  },
  specLabel: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.4)",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  specValue: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "700",
  },
  descriptionSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "700",
    marginBottom: 12,
  },
  ctaBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(20, 29, 38, 0.95)", // High density obsidian with backdrop filter feel
    borderTopWidth: 1,
    borderColor: "rgba(76, 107, 138, 0.25)",
    paddingHorizontal: 24,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceCol: {
    flexDirection: "column",
  },
  ctaPriceLabel: {
    fontSize: 9,
    color: "rgba(255, 255, 255, 0.4)",
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 2,
  },
  ctaPrice: {
    fontSize: 22,
    color: "#ffffff",
    fontWeight: "800",
  },
  reserveButton: {
    backgroundColor: "rgb(198, 154, 99)", // Brand Gold
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    shadowColor: "rgb(198, 154, 99)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  reserveButtonText: {
    color: "#15171a",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});
