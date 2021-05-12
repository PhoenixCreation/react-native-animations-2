import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoaderProvider, LoaderContext } from "./Loader";
import Second from "./Routes/Second";
import Home from "./Routes/Home";

// TODO: configure your app name at given locations:
//       app.json
//       Loader.js in keys
//       Folder name(if you want to)

const app = () => {
  return (
    <LoaderProvider>
      <StatusBar hidden={true} />
      <Navigator />
    </LoaderProvider>
  );
};

const Stack = createStackNavigator();

const Navigator = () => {
  const { loading, firsttime, settings } = useContext(LoaderContext);

  // if(loading) return

  // if(firsttime) return

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: false,
          headerShown: false,
          cardOverlayEnabled: false,
          cardStyle: { backgroundColor: "#fff" },
          animationEnabled: false,
        }}
        mode="modal"
        initialRoute="Home"
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Second" component={Second} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default app;
