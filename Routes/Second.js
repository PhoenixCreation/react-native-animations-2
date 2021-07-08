import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
const AnimatablePressable = Animatable.createAnimatableComponent(Pressable);

const { width, height } = Dimensions.get("window");

const ROUTES = [
  {
    name: "first",
    color: "indigo",
    icon: (color) => <Feather name="home" size={24} color={color} />,
  },
  {
    name: "second",
    color: "#0a0",
    icon: (color) => <Feather name="gitlab" size={24} color={color} />,
  },
  {
    name: "third",
    color: "#00a",
    icon: (color) => <Feather name="heart" size={24} color={color} />,
  },
  {
    name: "fourth",
    color: "#1f5",
    icon: (color) => <Feather name="award" size={24} color={color} />,
  },
  {
    name: "fifth",
    color: "#15f",
    icon: (color) => <Feather name="user" size={24} color={color} />,
  },
];

const SearchOptions = [
  "sports",
  "learning",
  "facts",
  "crafts",
  "art",
  "boxing",
  "driving",
];

const searchAnimation = {
  0: { width: "0%" },
  1: { width: "100%" },
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

const Second = () => {
  const [route, setRoute] = useState(ROUTES[0]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.headingCont}>
            <Animatable.Text
              animation="fadeIn"
              duration={500}
              delay={200}
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
            delay={700}
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
                  delay={2000 + index * 200}
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
            delay={3000}
            useNativeDriver
            style={[styles.bottomCard, styles.bottomFirst]}
            onPress={() => {
              setRoute(ROUTES[1]);
            }}
          >
            <Text style={styles.bottomHeading}>Learn a new skill</Text>
            <Feather name="gitlab" color="indigo" size={24} />
          </AnimatablePressable>
          <AnimatablePressable
            animation={card2Animation}
            duration={750}
            easing="ease"
            delay={3500}
            useNativeDriver
            style={[styles.bottomCard, styles.bottomSecond]}
            onPress={() => {
              setRoute(ROUTES[2]);
            }}
          >
            <Text style={styles.bottomHeading}>Achieve specific Goal</Text>
            <Feather name="target" color="indigo" size={24} />
          </AnimatablePressable>
          <AnimatablePressable
            animation={card3Animation}
            duration={750}
            easing="ease"
            delay={3900}
            useNativeDriver
            style={[styles.bottomCard, styles.bottomThird]}
            onPress={() => {
              setRoute(ROUTES[3]);
            }}
          >
            <Text style={styles.bottomHeading}>Your past activities</Text>
            <Feather name="award" color="indigo" size={24} />
          </AnimatablePressable>
        </View>
      </View>
      <Navbar route={route} setRoute={setRoute} />
    </>
  );
};

export default Second;

const Navbar = ({ route, setRoute }) => {
  const progress = useSharedValue(0);
  const current = useSharedValue(0);

  useEffect(() => {
    let index = -1;
    for (let i = 0; i < ROUTES.length; i++) {
      const routes = ROUTES[i];
      if (route.name === routes.name) {
        index = i;
        break;
      }
    }
    if (index != -1) {
      current.value = index;
      progress.value = 0;
      progress.value = withTiming(
        1,
        {},
        () => (progress.value = withTiming(0))
      );
    }
  }, [route]);

  const iconStyle = (index) => {
    return useAnimatedStyle(() => {
      return {
        width: 40,
        height: 40,
        marginVertical: 6,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "aliceblue",
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        transform: [
          {
            translateY:
              current.value === index
                ? interpolate(progress.value, [0, 1], [0, -75])
                : withTiming(0),
          },
          {
            translateX:
              current.value === index
                ? withTiming(0)
                : interpolate(
                    progress.value,
                    [0, 1],
                    [0, (current.value - index) * 15]
                  ),
          },
        ],
      };
    });
  };

  const stylesNavbar = StyleSheet.create({
    navbar: {
      position: "absolute",
      bottom: 0,
      left: 0,
      minHeight: 40,
      flexDirection: "row",
      // backgroundColor: "#b3f5f1",
      marginHorizontal: 10,
      alignItems: "center",
      justifyContent: "space-between",
    },
    optionCont: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      minWidth: 60,
    },
  });

  return (
    <View style={stylesNavbar.navbar}>
      {ROUTES.map((routes, index) => {
        return (
          <Pressable
            style={stylesNavbar.optionCont}
            key={index}
            onPress={() => {
              setRoute(routes);
            }}
          >
            <Animated.View style={iconStyle(index)}>
              {routes.icon(routes.name !== route.name ? "#000b" : routes.color)}
            </Animated.View>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: width,
    height: height,
    paddingBottom: 50,
    backgroundColor: "mistyrose",
  },
  top: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "indigo",
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
    backgroundColor: "indigo",
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35,
    overflow: "hidden",
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
