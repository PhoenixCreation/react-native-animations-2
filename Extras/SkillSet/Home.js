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

const SearchOptions = [
  "sports",
  "learning",
  "facts",
  "crafts",
  "art",
  "boxing",
  "driving",
];

const startingDotAnimation = {
  0: { scale: 1, opacity: 0.3 },
  1: { scale: 20, opacity: 1 },
};

const card1Animation = {
  0: { translateY: 250, translateX: -100, opacity: 0.5 },
  1: { translateY: 0, translateX: 0, opacity: 1 },
};
const card2Animation = {
  0: { translateY: 250, translateX: 100, opacity: 0.5 },
  1: { translateY: 0, translateX: 0, opacity: 1 },
};
const card3Animation = {
  0: { translateY: 250, translateX: -100, opacity: 0.5 },
  1: { translateY: 0, translateX: 0, opacity: 1 },
};

const Home = ({ navigation }) => {
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
            colors={["indigo", "#8B00d2"]}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={[StyleSheet.absoluteFillObject]}
          ></LinearGradient>
        </Animatable.View>
      </View>
      <View style={styles.top}>
        <View style={styles.headingCont}>
          <Animatable.Text
            animation="fadeIn"
            duration={500}
            delay={400}
            easing="ease-in"
            style={styles.heading}
          >
            What do you feel like doing today?
          </Animatable.Text>
        </View>
        <Animatable.View
          animation="fadeInLeft"
          duration={750}
          easing="ease-in"
          useNativeDriver
          delay={600}
          style={styles.searchCont}
        >
          <TextInput
            style={styles.search}
            placeholder="find something interesting"
          />
          <Pressable style={styles.searchSubmit}>
            <Feather size={20} color="white" name="search" />
          </Pressable>
        </Animatable.View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.optionScroll}
        >
          {SearchOptions.map((option, index) => {
            return (
              <AnimatablePressable
                animation="fadeIn"
                duration={500}
                easing="ease"
                delay={1000 + index * 200}
                useNativeDriver
                style={styles.optionCont}
                key={index}
              >
                <Text style={styles.option}>{option}</Text>
              </AnimatablePressable>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.bottom}>
        <AnimatablePressable
          animation={card1Animation}
          duration={750}
          easing="ease"
          delay={1500}
          useNativeDriver
          style={[styles.bottomCard, styles.bottomFirst]}
          onPress={() => {
            navigation.navigate("SkillSetExplore");
          }}
        >
          <Text style={styles.bottomHeading}>Learn a new skill</Text>
          <Feather name="gitlab" color="indigo" size={24} />
        </AnimatablePressable>
        <AnimatablePressable
          animation={card2Animation}
          duration={750}
          easing="ease"
          delay={2000}
          useNativeDriver
          style={[styles.bottomCard, styles.bottomSecond]}
          onPress={() => {
            // setRoute(ROUTES[2]);
          }}
        >
          <Text style={styles.bottomHeading}>Achieve specific Goal</Text>
          <Feather name="target" color="indigo" size={24} />
        </AnimatablePressable>
        <AnimatablePressable
          animation={card3Animation}
          duration={750}
          easing="ease"
          delay={2500}
          useNativeDriver
          style={[styles.bottomCard, styles.bottomThird]}
          onPress={() => {
            // setRoute(ROUTES[3]);
          }}
        >
          <Text style={styles.bottomHeading}>Your past activities</Text>
          <Feather name="award" color="indigo" size={24} />
        </AnimatablePressable>
      </View>
    </View>
  );
};

export default Home;

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
    backgroundColor: "indigo",
    overflow: "hidden",
  },
  top: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  headingCont: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  heading: {
    color: "white",
    fontSize: 26,
    textAlign: "right",
    fontFamily: "RobotoAdded",
  },
  searchCont: {
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  search: {
    width: "100%",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingRight: 40,
    paddingVertical: 5,
    backgroundColor: "lightcyan",
    fontSize: 16,
    fontFamily: "serif",
    color: "black",
    borderWidth: 2,
    borderColor: "blue",
  },
  searchSubmit: {
    position: "absolute",
    right: 5,
    backgroundColor: "#0000f0",
    padding: 5,
    borderRadius: 30,
    transform: [{ rotateY: "180deg" }],
  },
  optionScroll: {
    marginHorizontal: 20,
  },
  optionCont: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff9",
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  option: {
    color: "#fff",
    fontFamily: "RobotoAdded",
  },
  bottom: {
    height: 250,
    justifyContent: "space-between",
  },
  bottomImage: {
    width: 50,
    height: 50,
  },
  bottomCard: {
    ...StyleSheet.absoluteFillObject,
    padding: 10,
    flexDirection: "row",
  },
  bottomFirst: {
    top: 0,
    right: "20%",
    zIndex: 1,
    backgroundColor: "skyblue",
    borderTopRightRadius: 25,
  },
  bottomSecond: {
    top: "30%",
    left: "10%",
    zIndex: 2,
    backgroundColor: "slateblue",
    borderTopLeftRadius: 25,
  },
  bottomThird: {
    top: "60%",
    right: "15%",
    zIndex: 3,
    backgroundColor: "dodgerblue",
    borderTopRightRadius: 25,
  },
  bottomHeading: {
    color: "white",
    fontSize: 20,
    fontFamily: "RobotoAdded",
    marginRight: 10,
  },
});
