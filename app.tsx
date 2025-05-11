import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigator from './app/src/routers/MainNavigator';
import AuthNavigator from './app/src/routers/AuthNavigator';
import { getToken } from './app/src/utils/storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScheduleProvider } from './app/src/context/ScheduleContext';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log('Debug: app.tsx - Inside App component');

  useEffect(() => {
    console.log('Debug: app.tsx - Inside useEffect');
    const checkToken = async () => {
      console.log('Debug: app.tsx - Before getToken');
      const token = await getToken();
      console.log('Debug: app.tsx - After getToken, token:', token);
      setIsLoggedIn(!!token);
    };
    checkToken();
  }, []);

  console.log('Debug: app.tsx - Rendering App, isLoggedIn:', isLoggedIn);

  return (
    <SafeAreaProvider>
      <ScheduleProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isLoggedIn ? (
              <Stack.Screen
                name="Main"
                component={(props: any) => <MainNavigator {...props} setIsLoggedIn={setIsLoggedIn} />}
              />
            ) : (
              <Stack.Screen
                name="Auth"
                component={(props: any) => <AuthNavigator {...props} setIsLoggedIn={setIsLoggedIn} />}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ScheduleProvider>
    </SafeAreaProvider>
  );
}