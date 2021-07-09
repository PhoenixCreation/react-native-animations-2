import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

const AnimatablePressable = Animatable.createAnimatableComponent(Pressable);

const { width, height } = Dimensions.get("window");

const startingDotAnimation = {
  0: { scale: 1, opacity: 0.3 },
  1: { scale: 20, opacity: 1 },
};

const Explore = () => {
  return (
    <View style={styles.container}>
      <View style={styles.startingDotCont}>
        <Animatable.View
          animation={startingDotAnimation}
          durtion={500}
          useNativeDriver
          easing="ease-in-out"
          style={styles.startingDot}
        >
          <LinearGradient
            colors={["skyblue", "#a7dEfB"]}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={[StyleSheet.absoluteFillObject]}
          ></LinearGradient>
        </Animatable.View>
      </View>
      <Text>Exlpore page</Text>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: width,
    height: height - 50,
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35,
    overflow: "hidden",
  },
  startingDotCont: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  startingDot: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "skyblue",
    overflow: "hidden",
  },
});
