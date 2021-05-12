import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View>
      <Text onPress={() => navigation.navigate("Second")}>Home</Text>
      <View style={styles.check}></View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  check: {
    backgroundColor: "red",
    width: 100,
    height: 100,
  },
});
