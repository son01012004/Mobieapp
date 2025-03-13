import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import MainNavigator from "./src/routers/MainNavigator";

const App = () => {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </NavigationIndependentTree>
  );
};

export default App;
