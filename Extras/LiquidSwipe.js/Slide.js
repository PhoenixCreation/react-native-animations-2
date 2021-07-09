import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import Color from "color";
import Svg, { RadialGradient, Defs, Rect, Stop } from "react-native-svg";

const { width, height } = Dimensions.get("window");
const Slide = ({ slide }) => {
  const lighterColor = Color(slide.color).lighten(0.8).toString();
  return (
    <>
      <Svg style={[StyleSheet.absoluteFill]}>
        <Defs>
          <RadialGradient id="gradient" cx="50%" cy="35%">
            <Stop offset="0%" stopColor={lighterColor} />
            <Stop offset="100%" stopColor={slide.color} />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={width} height={height} fill="url(#gradient)" />
      </Svg>
      <View style={{ ...styles.container }}>
        <Image source={{ uri: slide.picture }} style={styles.image} />
        <View>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.description} numberOfLines={4}>
            {slide.description}
          </Text>
        </View>
      </View>
    </>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: 75,
    paddingTop: 150,
    alignItems: "center",
  },
  image: {
    width: 175,
    height: 175,
  },
  title: {
    fontSize: 33,
    color: "white",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});
