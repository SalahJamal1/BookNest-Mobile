import ReservationMessage from "@/components/ReservationMessage";
import { useWild } from "@/context/WildContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(date));

export default function Reservations() {
  const { user } = useWild();
  if (user?.bookings?.length <= 0) return <ReservationMessage />;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brand}>YOUR BOOKINGS</Text>
        <Text style={styles.title}>Reservations</Text>
        <Text style={styles.subtitle}>
          {user?.bookings?.length}{" "}
          {user?.bookings?.length === 1 ? "reservation" : "reservations"} found
        </Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={user?.bookings}
        keyExtractor={(item) => item?.id?.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Cabin Name Row */}
            <View style={styles.cardHeader}>
              <View style={styles.cabinNameRow}>
                <View style={styles.cabinIconWrap}>
                  <Ionicons name="bed" size={16} color="rgb(198, 154, 99)" />
                </View>
                <Text style={styles.cabinName}>Cabin {item?.cabins?.name}</Text>
              </View>
              <View style={styles.pricePill}>
                <Text style={styles.priceText}>
                  ${item?.totalPrice?.toLocaleString()}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Details Grid */}
            <View style={styles.detailsGrid}>
              <View style={styles.detailCell}>
                <FontAwesome5
                  name="users"
                  size={11}
                  color="rgb(198, 154, 99)"
                />
                <Text style={styles.detailLabel}>Guests</Text>
                <Text style={styles.detailValue}>{item?.numGuests}</Text>
              </View>
              <View style={styles.detailCell}>
                <FontAwesome5 name="moon" size={11} color="rgb(198, 154, 99)" />
                <Text style={styles.detailLabel}>Nights</Text>
                <Text style={styles.detailValue}>{item?.numNights}</Text>
              </View>
              <View style={styles.detailCell}>
                <FontAwesome5
                  name="calendar-alt"
                  size={11}
                  color="rgb(198, 154, 99)"
                />
                <Text style={styles.detailLabel}>Check-in</Text>
                <Text style={styles.detailValue}>
                  {formatDate(item?.startDate)}
                </Text>
              </View>
              <View style={styles.detailCell}>
                <FontAwesome5
                  name="calendar-check"
                  size={11}
                  color="rgb(198, 154, 99)"
                />
                <Text style={styles.detailLabel}>Check-out</Text>
                <Text style={styles.detailValue}>
                  {formatDate(item?.endAt)}
                </Text>
              </View>
            </View>

            {/* Footer: Created date */}
            <View style={styles.cardFooter}>
              <Text style={styles.createdText}>
                Booked on {formatDate(item?.createdAt)}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(15, 23, 30)",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
  },
  brand: {
    fontSize: 10,
    color: "rgb(198, 154, 99)",
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 5,
  },
  title: {
    fontSize: 28,
    color: "#ffffff",
    fontWeight: "800",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.4)",
    fontWeight: "400",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "rgba(25, 36, 48, 0.6)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(76, 107, 138, 0.2)",
    marginBottom: 16,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  cabinNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cabinIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(198, 154, 99, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(198, 154, 99, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  cabinName: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "700",
  },
  pricePill: {
    backgroundColor: "rgba(198, 154, 99, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(198, 154, 99, 0.3)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  priceText: {
    color: "rgb(198, 154, 99)",
    fontSize: 13,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(76, 107, 138, 0.15)",
    marginHorizontal: 16,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 12,
    // gap: 2,
  },
  detailCell: {
    width: "46%",
    backgroundColor: "rgba(15, 23, 30, 0.85)",
    borderRadius: 10,
    padding: 10,
    gap: 3,
    marginHorizontal: "2%",
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.4)",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 13,
    color: "#ffffff",
    fontWeight: "700",
    marginTop: 1,
  },
  cardFooter: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 4,
  },
  createdText: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.94)",
    fontStyle: "italic",
  },
});
