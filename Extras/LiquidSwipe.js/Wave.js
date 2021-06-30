import MaskedView from "@react-native-community/masked-view";
import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  interpolate,
  Extrapolate,
  withSpring,
} from "react-native-reanimated";

const MARGIN_WIDTH = 30;

const AnimatedPath = Animated.createAnimatedComponent(Path);

const { width, height } = Dimensions.get("window");

const vec2 = (x, y) => {
  "worklet";
  return { x, y };
};
const curve = (c1, c2, to) => {
  "worklet";
  return `C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`;
};

const MIN_LEDGE = MARGIN_WIDTH - 20;

const Wave = ({ children, isLeft, x, y, isTransitioning }) => {
  const R = useDerivedValue(() => {
    return Math.min(x.value - MIN_LEDGE, width / 3);
  });
  const ledge = useDerivedValue(() => {
    const minLedge = interpolate(
      x.value,
      [0, MIN_LEDGE],
      [0, MIN_LEDGE],
      Extrapolate.CLAMP
    );
    const baseLedge = minLedge + Math.max(0, x.value - MIN_LEDGE - R.value);
    return withSpring(isTransitioning.value ? x.value : baseLedge);
  });
  const animatedProps = useAnimatedProps(() => {
    const stepY = x.value - MIN_LEDGE; // R = 50
    const stepX = R.value / 2; // R/2
    const C = stepY * 0.5522847498;

    const p1 = { x: ledge.value, y: y.value - 2 * stepY };
    const p2 = vec2(p1.x + stepX, p1.y + stepY);
    const p3 = vec2(p2.x + stepX, p2.y + stepY);
    const p4 = vec2(p3.x - stepX, p3.y + stepY);
    const p5 = vec2(p4.x - stepX, p4.y + stepY);

    const c11 = vec2(p1.x, p1.y + C);
    const c12 = vec2(p2.x, p2.y);

    const c21 = vec2(p2.x, p2.y);
    const c22 = vec2(p3.x, p3.y - C);

    const c31 = vec2(p3.x, p3.y + C);
    const c32 = vec2(p4.x, p4.y);

    const c41 = vec2(p4.x, p4.y);
    const c42 = vec2(p5.x, p5.y - C);

    return {
      d: [
        "M 0 0",
        `H ${p1.x - 10}`,
        `a 10 10 1 0 1 10 10`,
        `V ${p1.y}`,
        curve(c11, c12, p2),
        curve(c21, c22, p3),
        curve(c31, c32, p4),
        curve(c41, c42, p5),
        `V ${height - 10}`,
        `a 10 10 1 0 1 -10 10`,
        "H 0",
        "Z",
      ].join(" "),
    };
  });

  const animatedArrowProp = useAnimatedProps(() => {
    return {
      d: `
      M ${MARGIN_WIDTH - 7} ${y.value}
      l -7 -10
      M ${MARGIN_WIDTH - 7} ${y.value}
      l -7 10
      `,
    };
  });

  const maskElement = (
    <Svg
      style={[
        StyleSheet.absoluteFill,
        {
          transform: [{ rotateY: isLeft ? "0deg" : "180deg" }],
        },
      ]}
    >
      <AnimatedPath fill="black" animatedProps={animatedProps} />
    </Svg>
  );
  return (
    <MaskedView style={StyleSheet.absoluteFill} maskElement={maskElement}>
      <Svg
        style={
          ([StyleSheet.absoluteFill],
          {
            transform: [{ rotateY: isLeft ? "0deg" : "180deg" }],
            zIndex: 200,
          })
        }
      >
        <AnimatedPath
          fill="white"
          stroke="white"
          strokeWidth={2}
          animatedProps={animatedArrowProp}
        />
      </Svg>
      {children}
    </MaskedView>
  );
};

export default Wave;

const styles = StyleSheet.create({});
