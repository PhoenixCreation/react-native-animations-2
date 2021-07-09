import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Extras/SkillSet/Home";
import Explore from "../Extras/SkillSet/Explore";

const Stack = createStackNavigator();

const SkillSet = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
    >
      <Stack.Screen name="SkillSetHome" component={Home} />
      <Stack.Screen name="SkillSetExplore" component={Explore} />
    </Stack.Navigator>
  );
};

export default SkillSet;
