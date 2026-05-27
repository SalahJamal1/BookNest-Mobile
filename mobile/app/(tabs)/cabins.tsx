import CabinCard from "@/components/CabinCard";
import Error from "@/components/Error";
import Spinner from "@/components/Spinner";
import { useWild } from "@/context/WildContext";
import { ICabins } from "@/utils/helper";
import React, { useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

enum FilterType {
  ALL = "All cabins",
  SMALL = "2—3 guests",
  MEDIUM = "4—7 guests",
  LARGE = "8—12 guests",
}

const filterList: FilterType[] = [
  FilterType.ALL,
  FilterType.SMALL,
  FilterType.MEDIUM,
  FilterType.LARGE,
];

export default function Cabins() {
  const { cabins, error, loader } = useWild();
  const [filter, setFilter] = useState<FilterType>(FilterType.ALL);

  const onClick = (value: FilterType): void => {
    setFilter(value);
  };

  let cabinsFilter: ICabins[] = [];
  if (filter === FilterType.ALL) cabinsFilter = cabins;
  if (filter === FilterType.SMALL)
    cabinsFilter = cabins.filter((c) => c.maxCapacity <= 3);
  if (filter === FilterType.MEDIUM)
    cabinsFilter = cabins.filter(
      (c) => c.maxCapacity > 3 && c.maxCapacity <= 7
    );
  if (filter === FilterType.LARGE)
    cabinsFilter = cabins.filter((c) => c.maxCapacity >= 8);

  if (error) return <Error error={error} />;
  if (loader) return <Spinner />;

  return (
    <View style={styles.view}>
      {/* Premium Header */}
      <View style={styles.header}>
        <Text style={styles.brandTitle}>BOOKNEST</Text>
        <Text style={styles.title}>Luxury Cabins</Text>
        <Text style={styles.subtitle}>
          Find your private sanctuary in the heart of nature, designed for ultimate comfort and elegant peace.
        </Text>
      </View>

      {/* Horizontal Pill Filters */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {filterList.map((item, i) => {
            const isActive = filter === item;
            return (
              <Pressable
                onPress={() => onClick(item)}
                key={i}
                style={[
                  styles.filterPill,
                  isActive ? styles.filterPillActive : styles.filterPillInactive,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    isActive ? styles.filterTextActive : styles.filterTextInactive,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Cabins List */}
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
        style={styles.list}
        data={cabinsFilter}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }) => {
          return <CabinCard item={item} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: 65,
    backgroundColor: "rgb(15, 23, 30)", // Rich dark slate/obsidian background
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  brandTitle: {
    fontSize: 12,
    color: "rgb(198, 154, 99)", // Premium Gold
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 6,
  },
  title: {
    fontSize: 28,
    color: "#ffffff",
    fontWeight: "800",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
    lineHeight: 20,
    fontWeight: "400",
  },
  filterContainer: {
    height: 48,
    marginBottom: 16,
  },
  filterScroll: {
    paddingHorizontal: 24,
    gap: 8,
    alignItems: "center",
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  filterPillActive: {
    backgroundColor: "rgb(198, 154, 99)", // Gold active
    borderColor: "rgb(198, 154, 99)",
  },
  filterPillInactive: {
    backgroundColor: "rgba(30, 41, 54, 0.5)",
    borderColor: "rgba(76, 107, 138, 0.3)",
  },
  filterText: {
    fontSize: 13,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "rgb(15, 23, 30)", // High contrast dark text on gold background
  },
  filterTextInactive: {
    color: "rgba(255, 255, 255, 0.7)",
  },
  list: {
    paddingHorizontal: 20,
  },
});

