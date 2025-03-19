import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegisterForCoursesScreen } from '@/app/screen';


const Stack = createNativeStackNavigator();

const RegisterForCoursesNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="RegisterForCoursesScreen" // Đảm bảo tên khớp với intent
        component={RegisterForCoursesScreen}
      />
    </Stack.Navigator>
  );
};

export default RegisterForCoursesNavigator;