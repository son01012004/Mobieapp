
import { StatusBar } from "react-native";
import React, {useEffect, useState} from 'react';

import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import AuthNavigator from "./src/routers/AuthNavigator";
import MainNavigator from "./src/routers/MainNavigator";
import Sign from "../app/screen/Login/Sign-in";

const App = () => {
  const [isLoging, setIsLoging] = useState(false);
  const [isWellcome, setIsWellcome] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsWellcome(false)
    },1500);

    return () => clearTimeout(timeout);
  }
  )
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        {isWellcome ?( <Sign /> ) : isLoging ? (<MainNavigator />) : (<AuthNavigator />)} 
      </NavigationContainer>
    </NavigationIndependentTree>
  );
};

export default App;
