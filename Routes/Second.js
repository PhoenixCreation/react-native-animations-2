import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Second = ({ navigation }) => {
  return (
    <View>
      <Text onPress={() => navigation.navigate("Home")}>second</Text>
      <View style={styles.check}></View>
    </View>
  );
};

export default Second;

const styles = StyleSheet.create({
  check: {
    backgroundColor: "blue",
    width: 200,
    height: 200,
  },
});
