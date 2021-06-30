import React, { useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withSpring,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated";
import Wave from "./Wave";

const { width, height } = Dimensions.get("window");

const MARGIN_WIDTH = 30;

const snapPoint = (value, velocity, points) => {
  "worklet";
  const point = value + 0.2 * velocity;
  const deltas = points.map((p) => Math.abs(point - p));
  const minDelta = Math.min.apply(null, deltas);
  return points.filter((p) => Math.abs(point - p) === minDelta)[0];
};

const Slider = ({ index, setIndex, children, prev, next }) => {
  const hasPrev = !!prev;
  const hasNext = !!next;
  const leftX = useSharedValue(MARGIN_WIDTH);
  const leftY = useSharedValue(height / 1.3);
  const rightX = useSharedValue(MARGIN_WIDTH);
  const rightY = useSharedValue(height / 1.3);
  const activeSide = useSharedValue("none");
  const isTransitioningLeft = useSharedValue(false);
  const isTransitioningRight = useSharedValue(false);
  const zIndex = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: ({ x }) => {
      if (x < MARGIN_WIDTH && hasPrev) {
        activeSide.value = "left";
        zIndex.value = 100;
      } else if (x > width - MARGIN_WIDTH && hasNext) {
        activeSide.value = "right";
      } else {
        activeSide.value = "none";
      }
    },
    onActive: ({ x, y }) => {
      if (activeSide.value === "left") {
        leftX.value = x;
        leftY.value = y;
      } else if (activeSide.value === "right") {
        rightX.value = width - x;
        rightY.value = y;
      }
    },
    onEnd: ({ velocityX, velocityY, x }) => {
      if (activeSide.value === "left") {
        const dest = snapPoint(x, velocityX, [MARGIN_WIDTH, width]);
        const isGoingLeft = dest === width;
        isTransitioningLeft.value = isGoingLeft;
        leftX.value = withSpring(
          dest,
          {
            velocity: velocityX,
            overshootClamping: isGoingLeft ? true : false,
            restSpeedThreshold: isGoingLeft ? 100 : 0.01,
            restDisplacementThreshold: isGoingLeft ? 100 : 0.01,
          },
          () => {
            if (isGoingLeft) {
              runOnJS(setIndex)(index - 1);
            } else {
              zIndex.value = 0;
              activeSide.value = "none";
            }
          }
        );
        leftY.value = withSpring(height / 1.3, { velocity: velocityY });
      } else if (activeSide.value === "right") {
        const dest = snapPoint(x, velocityX, [0, width - MARGIN_WIDTH]);
        const isGoingRight = dest === 0;
        isTransitioningRight.value = isGoingRight;
        rightX.value = withSpring(
          width - dest,
          {
            velocity: velocityX,
            overshootClamping: isGoingRight ? true : false,
            restSpeedThreshold: isGoingRight ? 100 : 0.01,
            restDisplacementThreshold: isGoingRight ? 100 : 0.01,
          },
          () => {
            if (isGoingRight) {
              runOnJS(setIndex)(index + 1);
            } else {
              activeSide.value = "none";
            }
          }
        );
        rightY.value = withSpring(height / 1.3, { velocity: velocityY });
      }
    },
  });

  const leftStyle = useAnimatedStyle(() => ({
    zIndex: zIndex.value,
  }));

  useEffect(() => {
    leftX.value = 0;
    rightX.value = 0;
    setTimeout(() => {
      leftX.value = withSpring(MARGIN_WIDTH);
      rightX.value = withSpring(MARGIN_WIDTH);
    }, 300);
  }, [index, leftX, rightX]);

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill}>
        {children}
        {prev && (
          <Animated.View style={[StyleSheet.absoluteFillObject, leftStyle]}>
            <Wave
              isLeft={true}
              x={leftX}
              y={leftY}
              isTransitioning={isTransitioningLeft}
            >
              {prev}
            </Wave>
          </Animated.View>
        )}
        {next && (
          <Animated.View style={[StyleSheet.absoluteFillObject]}>
            <Wave
              isLeft={false}
              x={rightX}
              y={rightY}
              isTransitioning={isTransitioningRight}
            >
              {next}
            </Wave>
          </Animated.View>
        )}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Slider;

const styles = StyleSheet.create({});
