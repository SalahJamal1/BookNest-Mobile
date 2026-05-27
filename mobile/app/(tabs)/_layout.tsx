import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "rgb(198, 154, 99)", // Gold for active
        tabBarInactiveTintColor: "rgba(255,255,255,0.35)",
        tabBarStyle: {
          backgroundColor: "rgba(13, 20, 27, 0.97)", // Near-black obsidian
          borderTopWidth: 1,
          borderTopColor: "rgba(76, 107, 138, 0.2)",
          height: Platform.OS === "ios" ? 85 : 65,
          paddingBottom: Platform.OS === "ios" ? 24 : 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          letterSpacing: 0.3,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon({ focused, color }) {
            return (
              <View style={{ alignItems: "center", gap: 3 }}>
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={22}
                  color={color}
                />
                {focused && (
                  <View
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: "rgb(198, 154, 99)",
                      position: "absolute",
                      bottom: -6,
                    }}
                  />
                )}
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="cabins"
        options={{
          title: "Cabins",
          tabBarIcon({ focused, color }) {
            return (
              <View style={{ alignItems: "center", gap: 3 }}>
                <Ionicons
                  name={focused ? "bed" : "bed-outline"}
                  size={22}
                  color={color}
                />
                {focused && (
                  <View
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: "rgb(198, 154, 99)",
                      position: "absolute",
                      bottom: -6,
                    }}
                  />
                )}
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          tabBarIcon({ focused, color }) {
            return (
              <View style={{ alignItems: "center", gap: 3 }}>
                <Ionicons
                  name={focused ? "person" : "person-outline"}
                  size={22}
                  color={color}
                />
                {focused && (
                  <View
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: "rgb(198, 154, 99)",
                      position: "absolute",
                      bottom: -6,
                    }}
                  />
                )}
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon({ focused, color }) {
            return (
              <View style={{ alignItems: "center", gap: 3 }}>
                <Ionicons
                  name={
                    focused
                      ? "information-circle"
                      : "information-circle-outline"
                  }
                  size={22}
                  color={color}
                />
                {focused && (
                  <View
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: "rgb(198, 154, 99)",
                      position: "absolute",
                      bottom: -6,
                    }}
                  />
                )}
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="(cabins)"
        options={{
          tabBarItemStyle: { display: "none" },
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
}
