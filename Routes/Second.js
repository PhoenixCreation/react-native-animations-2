import React, { useState, useEffect } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";

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

const Second = () => {
  const [route, setRoute] = useState(ROUTES[0]);

  return (
    <>
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
      backgroundColor: "#b3f5f1",
      borderTopRightRadius: 25,
      borderTopLeftRadius: 25,
      marginHorizontal: 10,
      paddingHorizontal: 10,
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
