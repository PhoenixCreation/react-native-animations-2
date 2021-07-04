import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const ROUTES = [
  {
    name: "Home",
    color: "#f56",
    icon: (color) => <Feather name="home" size={24} color={color} />,
  },
  {
    name: "LiquidSwipe",
    color: "#0a0",
    icon: (color) => <Feather name="gitlab" size={24} color={color} />,
  },
  {
    name: "Second",
    color: "#00a",
    icon: (color) => <Feather name="heart" size={24} color={color} />,
  },
  {
    name: "Third",
    color: "#1f5",
    icon: (color) => <Feather name="award" size={24} color={color} />,
  },
];
const Navbar = () => {
  const route = useRoute();
  const progress = useSharedValue(0);
  const current = useSharedValue(0);

  useEffect(() => {
    let index = -1;
    for (let i = 0; i < ROUTES.length; i++) {
      const routes = ROUTES[i];
      if (route?.name === routes.name) {
        index = i;
        break;
      }
    }
    if (index != -1) {
      current.value = index;
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
        backgroundColor: "#b3f5f1",
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
          // {
          //   scale:
          //     current.value === index
          //       ? interpolate(progress.value, [0, 1], [1, 0.4])
          //       : withTiming(1),
          // },
        ],
      };
    });
  };

  return (
    <View style={styles.navbar}>
      {ROUTES.map((routes, index) => {
        return (
          <Pressable
            style={styles.optionCont}
            key={index}
            onPress={() => {
              navigate(routes.name);
            }}
          >
            <Animated.View style={iconStyle(index)}>
              {routes.icon(
                routes.name !== route?.name ? "black" : routes.color
              )}
            </Animated.View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    minHeight: 40,
    flexDirection: "row",
    backgroundColor: "#b3f5f1",
    marginHorizontal: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

// To get the navigation container reference
export const navigationRef = React.createRef();

// exported function so we can use navigate from outside of the navigation conatiner
export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

// Custom made useRoute hook from navigationRef
export function useRoute() {
  const [route, setRoute] = useState(navigationRef?.current?.getCurrentRoute());
  const [load, setLoad] = useState(true);
  useEffect(() => {
    getRoute();
  }, []);

  useEffect(() => {
    if (!load) {
      setRoute(navigationRef?.current?.getCurrentRoute()); // when runs first time for sfety
      const unsubscribe = navigationRef.current?.addListener("state", (e) => {
        setRoute(navigationRef.current.getCurrentRoute());
      });
      return unsubscribe;
    }
  }, [load]);

  const getRoute = () => {
    if (!navigationRef?.current?.getCurrentRoute) {
      setTimeout(() => {
        getRoute();
      }, 1000);
      return;
    }
    setLoad(false);
  };

  return route;
}
