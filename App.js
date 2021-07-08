import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoaderProvider, LoaderContext } from "./Loader";
import Home from "./Routes/Home";
import { SLIDES } from "./Slides";
import Navbar, { navigationRef } from "./Navbar";
import { useFonts } from "@use-expo/font";
import AppLoading from "expo-app-loading";

const FONTS = {
  SourceCodePro: require("./assets/fonts/SourceCodePro-Regular.ttf"),
  Tourney: require("./assets/fonts/Tourney.ttf"),
  RobotoAdded: require("./assets/fonts/Roboto-Regular.ttf"),
};

const app = () => {
  const [loaded] = useFonts(FONTS);

  if (!loaded) return <AppLoading />;

  return (
    <LoaderProvider>
      <StatusBar hidden={true} />
      <Navigator />
      {/* <Navbar /> */}
    </LoaderProvider>
  );
};

const Stack = createStackNavigator();

const Navigator = () => {
  const { loading, firsttime, settings } = useContext(LoaderContext);

  // if(loading) return

  // if(firsttime) return

  return (
    <NavigationContainer ref={navigationRef}>
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
        {SLIDES.map((slide, index) => (
          <Stack.Screen
            name={slide.name}
            component={slide.component}
            key={index}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default app;
