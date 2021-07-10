import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const categories = {
  recomended: "loader",
  camera: "camera",
  painting: "edit-2",
  sports: "dribbble",
  driving: "life-buoy",
  facts: "check-square",
  crafts: "feather",
};

const CategoryIcon = (props) => {
  if (categories[props.category]) {
    return <Feather name={categories[props.category]} {...props} />;
  }
  console.warn(props.category + " is not available");
  return <Feather name="alert-octagon" {...props} />;
};

export default CategoryIcon;

const styles = StyleSheet.create({});
