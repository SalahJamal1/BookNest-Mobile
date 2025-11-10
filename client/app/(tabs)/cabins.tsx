import CabinCard from "@/components/CabinCard";
import Error from "@/components/Error";
import Spinner from "@/components/Spinner";
import { useWild } from "@/context/WildContext";
import { ICabins } from "@/utils/helper";
import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
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
      <View style={styles.view1}>
        {filterList.map((item, i) => (
          <Pressable onPress={() => onClick(item)} key={i}>
            <Text
              style={{
                ...styles.text,
                backgroundColor:
                  filter === item ? "rgb(76 107 138)" : "rgb(19 28 36)",
              }}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{
          marginHorizontal: 20,
          paddingVertical: 10,
        }}
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
    paddingTop: 55,
    backgroundColor: "rgb(19 28 36)",
  },
  view1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
    borderColor: "rgb(76 107 138)",
    borderWidth: 1,
    marginHorizontal: 20,
  },
  text: {
    color: "#fff",
    borderColor: "rgb(76 107 138)",
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
});
