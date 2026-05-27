import { apiLogout } from "@/api/apiAuth";
import { useWild } from "@/context/WildContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function Account() {
  const { auth, user, dispatch } = useWild();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await apiLogout();
      dispatch({ type: "USER_LOGOUT" });
      AsyncStorage.removeItem("jwt");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong, try again";
      Toast.show({ type: "error", text1: message, position: "top" });
    }
  };

  // Avatar initials from first + last name
  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero / Brand Section */}
      <View style={styles.hero}>
        <Text style={styles.brand}>BOOKNEST</Text>
        <Text style={styles.heroTitle}>Guest Area</Text>
        <Text style={styles.heroSub}>
          Cozy yet luxurious cabins in the heart of the Italian Dolomites. Wake
          up to mountain views, explore dark forests, or relax in your private
          hot tub under the stars.
        </Text>
      </View>

      {/* User Card (if logged in) */}
      {auth && user && (
        <View style={styles.userCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {user.firstName} {user.lastName}
            </Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
          <View style={styles.memberBadge}>
            <Text style={styles.memberBadgeText}>Member</Text>
          </View>
        </View>
      )}

      {/* Divider */}
      <View style={styles.divider} />

      {/* Menu Items */}
      <View style={styles.menuSection}>
        {auth ? (
          <>
            <Link href="/(tabs)/(profile)/reservations" asChild>
              <Pressable style={styles.menuItem}>
                <View style={styles.menuIconWrap}>
                  <FontAwesome5
                    name="calendar-check"
                    size={15}
                    color="rgb(198, 154, 99)"
                  />
                </View>
                <Text style={styles.menuLabel}>My Reservations</Text>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color="rgba(255,255,255,0.3)"
                />
              </Pressable>
            </Link>

            <View style={styles.menuSeparator} />

            <Pressable style={styles.menuItem} onPress={handleLogout}>
              <View style={[styles.menuIconWrap, styles.menuIconDanger]}>
                <Ionicons name="log-out-outline" size={17} color="#e87d7d" />
              </View>
              <Text style={[styles.menuLabel, styles.menuLabelDanger]}>
                Sign Out
              </Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color="rgba(255,255,255,0.3)"
              />
            </Pressable>
          </>
        ) : (
          <>
            <Link href="/(tabs)/(profile)/login" asChild>
              <Pressable style={styles.menuItem}>
                <View style={styles.menuIconWrap}>
                  <Ionicons
                    name="log-in-outline"
                    size={18}
                    color="rgb(198, 154, 99)"
                  />
                </View>
                <Text style={styles.menuLabel}>Sign In</Text>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color="rgba(255,255,255,0.3)"
                />
              </Pressable>
            </Link>

            <View style={styles.menuSeparator} />

            <Link href="/(tabs)/(profile)/signup" asChild>
              <Pressable style={styles.menuItem}>
                <View style={styles.menuIconWrap}>
                  <Ionicons
                    name="person-add-outline"
                    size={17}
                    color="rgb(198, 154, 99)"
                  />
                </View>
                <Text style={styles.menuLabel}>Create Account</Text>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color="rgba(255,255,255,0.3)"
                />
              </Pressable>
            </Link>
          </>
        )}
      </View>

      {/* Bottom Brand Note */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Welcome to paradise. The perfect spot for a peaceful, calm vacation.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(15, 23, 30)",
  },
  hero: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 28,
  },
  brand: {
    fontSize: 11,
    color: "rgb(198, 154, 99)",
    fontWeight: "700",
    letterSpacing: 2.5,
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: 32,
    color: "#ffffff",
    fontWeight: "800",
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  heroSub: {
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    lineHeight: 22,
    fontWeight: "400",
  },
  userCard: {
    marginHorizontal: 20,
    backgroundColor: "rgba(25, 36, 48, 0.6)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(198, 154, 99, 0.2)",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgb(198, 154, 99)",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#15171a",
    fontSize: 17,
    fontWeight: "800",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 15,
    color: "#ffffff",
    fontWeight: "700",
    textTransform: "capitalize",
  },
  userEmail: {
    fontSize: 12,
    color: "rgba(255,255,255,0.45)",
    marginTop: 2,
  },
  memberBadge: {
    backgroundColor: "rgba(198, 154, 99, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(198, 154, 99, 0.3)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  memberBadgeText: {
    fontSize: 10,
    color: "rgb(198, 154, 99)",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(76, 107, 138, 0.2)",
    marginHorizontal: 24,
    marginBottom: 8,
  },
  menuSection: {
    marginHorizontal: 20,
    backgroundColor: "rgba(25, 36, 48, 0.4)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(76, 107, 138, 0.15)",
    overflow: "hidden",
    marginTop: 12,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 18,
    gap: 14,
  },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(198, 154, 99, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(198, 154, 99, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuIconDanger: {
    backgroundColor: "rgba(232, 125, 125, 0.1)",
    borderColor: "rgba(232, 125, 125, 0.2)",
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: "#ffffff",
    fontWeight: "600",
  },
  menuLabelDanger: {
    color: "#e87d7d",
  },
  menuSeparator: {
    height: 1,
    backgroundColor: "rgba(76, 107, 138, 0.15)",
    marginLeft: 68,
  },
  footer: {
    marginHorizontal: 24,
    marginTop: 28,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.25)",
    textAlign: "center",
    lineHeight: 18,
    fontStyle: "italic",
  },
});
