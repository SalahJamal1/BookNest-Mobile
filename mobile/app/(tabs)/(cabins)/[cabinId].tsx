import Error from "@/components/Error";
import Spinner from "@/components/Spinner";
import TextEditor from "@/components/TextEditor";
import { useWild } from "@/context/WildContext";
import useCabins from "@/hooks/useCabins";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Cabin() {
  const { cabin, auth, dispatch, error, loader } = useWild();
  const { cabinId } = useLocalSearchParams();
  const { fetchCabin } = useCabins();
  useEffect(() => {
    fetchCabin(+cabinId, dispatch);
  }, [fetchCabin, cabinId, dispatch]);

  if (error) return <Error error={error} />;
  if (loader) return <Spinner />;

  return (
    <ScrollView style={styles.scrollView}>
      <Image
        source={{ uri: cabin.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.view}>
        <Text style={styles.text}>Cabin {cabin.name}</Text>

        <TextEditor description={cabin.description} />

        <View style={styles.view2}>
          <FontAwesome5 name="user-friends" size={15} color="#ddd" />
          <Text style={styles.text2}>For up to {cabin.maxCapacity} guests</Text>
        </View>
        <View style={styles.view3}>
          <Entypo name="eye-with-line" size={15} color="#ddd" />
          <Text style={styles.text3}>Privacy 100% guaranteed</Text>
        </View>
      </View>
      <Link
        href={auth ? `/modal?cabinId=${cabin.id}` : "/account/login"}
        style={styles.link}
      >
        {auth
          ? `Reserve ${cabin.name} today. Click here`
          : "Ready to order? Login!"}
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "rgb(19 28 36)",
  },
  image: {
    width: "100%",
    height: 400,
    objectFit: "cover",
    marginBottom: 20,
  },
  view: {
    marginHorizontal: 20,
  },
  view2: {
    display: "flex",
    flexDirection: "row",
    gap: 7,
    marginBottom: 5,
  },
  view3: {
    display: "flex",
    flexDirection: "row",
    gap: 7,
  },
  text: {
    fontSize: 15,
    color: "rgb(198 154 99)",
    fontWeight: "500",
    marginBottom: 10,
    lineHeight: 15,
  },
  text2: {
    fontSize: 13,
    color: "#ddd",
    fontWeight: "300",
  },
  text3: {
    fontSize: 13,
    color: "#ddd",
    fontWeight: "300",
    marginBottom: 10,
  },
  link: {
    color: "#ffff",
    fontWeight: "700",
    backgroundColor: "rgb(198 154 99)",
    padding: 10,
    fontSize: 16,
    letterSpacing: 1,
    textAlign: "center",
    alignSelf: "center",
    marginVertical: 20,
  },
});
