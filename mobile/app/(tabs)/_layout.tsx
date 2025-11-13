import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "rgb(19 28 36)",
          paddingTop: 7,
        },
        tabBarLabelStyle: { fontSize: 13 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon({ focused }) {
            return (
              <Ionicons
                name="home-outline"
                size={24}
                color={focused ? "#fff" : "#888"}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="cabins"
        options={{
          title: "Cabins",
          tabBarIcon({ focused }) {
            return (
              <Ionicons
                name="bed-outline"
                size={24}
                color={focused ? "#fff" : "#888"}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon({ focused }) {
            return (
              <Ionicons
                name="information-circle-outline"
                size={24}
                color={focused ? "#fff" : "#888"}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="(cabins)/[cabinId]"
        options={{ tabBarItemStyle: { display: "none" } }}
      />
    </Tabs>
  );
}
