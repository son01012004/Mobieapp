import { StatusBar } from "react-native";
import React, { useEffect, useState } from 'react';
import AuthNavigator from "./src/routers/AuthNavigator";
import MainNavigator from "./src/routers/MainNavigator";
import Sign from "../app/screen/Login/Sign-in";

const App = () => {
  const [isLoging, setIsLoging] = useState(false);
  const [isWellcome, setIsWellcome] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsWellcome(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {isWellcome ? (
        <Sign />
      ) : isLoging ? (
        <MainNavigator />
      ) : (
        <AuthNavigator setIsLoging={setIsLoging} />
      )}
    </>
  );
};

export default App;