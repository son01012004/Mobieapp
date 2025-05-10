import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigator from './app/src/routers/MainNavigator';
import AuthNavigator from './app/src/routers/AuthNavigator';
import { getToken } from './app/src/utils/storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScheduleProvider } from './app/src/context/ScheduleContext'; // Đường dẫn tới ScheduleContext

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
      <ScheduleProvider> {/* Bao bọc toàn cục bằng ScheduleProvider */}
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isLoggedIn ? (
              <Stack.Screen
                name="Main"
                children={(props) => <MainNavigator {...props} setIsLoggedIn={setIsLoggedIn} />}
                options={{ headerShown: false }}
              />
            ) : (
              <Stack.Screen
                name="Auth"
                children={(props) => <AuthNavigator {...props} setIsLoggedIn={setIsLoggedIn} />}
                options={{ headerShown: false }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ScheduleProvider>
    </SafeAreaProvider>
  );
}