import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '@/app/screen';

const ProfileNavigator = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen  name = "ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  )
}

export default ProfileNavigator