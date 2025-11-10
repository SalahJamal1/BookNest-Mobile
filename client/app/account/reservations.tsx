import ReservationMessage from "@/components/ReservationMessage";
import { useWild } from "@/context/WildContext";
import { FlatList, StyleSheet, Text, View } from "react-native";

const formDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-us", {
    year: "2-digit",
    month: "short",
    day: "2-digit",
  }).format(new Date(date));
};
export default function Reservations() {
  const { user } = useWild();
  if (user?.bookings?.length <= 0) return <ReservationMessage />;

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={styles.flat}
      data={user?.bookings}
      keyExtractor={(item) => item?.id?.toString()}
      renderItem={({ item }) => {
        return (
          <View style={styles.view}>
            <View style={styles.view1}>
              <View style={styles.view2}>
                <Text style={styles.name}>Cabin {item?.cabins?.name}</Text>
                <Text style={styles.text}>
                  Created: {formDate(item?.createdAt)}
                </Text>
              </View>

              <View style={styles.view2}>
                <Text style={styles.text}>For {item?.numGuests} guests</Text>
                <Text style={styles.text}>{item?.numNights} Night</Text>
              </View>
              <View style={styles.view2}>
                <Text style={styles.text}>
                  Start: {formDate(item?.startDate)}
                </Text>
                <Text style={styles.text}>End: {formDate(item?.endAt)}</Text>
              </View>
              <View style={styles.view2}>
                <Text style={styles.text}>Order Price:</Text>

                <Text style={styles.text}>
                  ${item?.totalPrice.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  flat: {
    paddingHorizontal: 20,
    backgroundColor: "rgb(19 28 36)",
  },
  view: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
    borderColor: "rgb(76 107 138)",
    borderWidth: 1,
  },
  view1: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
  },
  view2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  name: {
    fontSize: 15,
    color: "rgb(198 154 99)",
    fontWeight: "500",
  },

  text: {
    fontSize: 13,
    color: "#ddd",
    fontWeight: "300",
  },
});
