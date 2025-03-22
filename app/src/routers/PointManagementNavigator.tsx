import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PointManagementScreen } from "@/app/screen";

const PointManagementNavigator = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen  name = "PointManagementScreen" component={PointManagementScreen} />
    </Stack.Navigator>
  )
}

export default PointManagementNavigator
