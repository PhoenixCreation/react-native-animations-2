import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SLIDES } from "../Slides";

const Home = ({ navigation }) => {
  return (
    <View>
      {SLIDES.map((slide, index) => {
        return (
          <Pressable
            onPress={() => navigation.navigate(slide.name)}
            style={styles.cont}
            key={index}
          >
            <Text>{slide.name}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  cont: {
    width: "90%",
    marginHorizontal: "5%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 40,
  },
});
