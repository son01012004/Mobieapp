import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FrameworkProgramScreen, ProfileScreen } from '@/app/screen'; // Adjust path if needed

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="FrameworkProgramScreen" component={FrameworkProgramScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;