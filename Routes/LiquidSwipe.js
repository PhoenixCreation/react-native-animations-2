import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Slide from "../Extras/LiquidSwipe.js/Slide";
import Slider from "../Extras/LiquidSwipe.js/Slider";

const slides = [
  {
    color: "#F2A1AD",
    title: "1 Dessert Recipes 1",
    description:
      "Hot or cold, our dessert recipes can turn an average meal into a memorable event",
    picture:
      "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/season4/src/LiquidSwipe/assets/1.png",
  },
  {
    color: "#0090D6",
    title: "2 Healthy Foods 2",
    description:
      "Discover healthy recipes that are easy to do with detailed cooking instructions from top chefs",
    picture:
      "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/season4/src/LiquidSwipe/assets/5.png",
  },
  {
    color: "#69C743",
    title: "3 Easy Meal Ideas 3",
    description:
      "explore recipes by food type, preparation method, cuisine, country and more",
    picture:
      "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/season4/src/LiquidSwipe/assets/4.png",
  },
  {
    color: "#FB3A4D",
    title: "4 10000+ Recipes 4",
    description:
      "Browse thousands of curated recipes from top chefs, each with detailled cooking instructions",
    picture:
      "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/season4/src/LiquidSwipe/assets/2.png",
  },
  {
    color: "#F2AD62",
    title: "5 Video Tutorials 5",
    description:
      "Browse our best themed recipes, cooking tips, and how-to food video & photos",
    picture:
      "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/season4/src/LiquidSwipe/assets/3.png",
  },
];

export const MARGIN_WIDTH = 30;

const LiquidSwipe = () => {
  const [index, setIndex] = useState(0);
  const prev = slides[index - 1];
  const next = slides[index + 1];

  const newFunction = (i) => {
    setIndex(i);
  };
  return (
    <Slider
      index={index}
      setIndex={newFunction}
      prev={prev && <Slide slide={prev} />}
      next={next && <Slide slide={next} />}
    >
      <Slide slide={slides[index]} />
    </Slider>
  );
};

export default LiquidSwipe;

const styles = StyleSheet.create({});
