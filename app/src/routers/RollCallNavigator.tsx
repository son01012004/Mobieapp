import { View, Text } from 'react-native'
import React from 'react'
import {RollCallScreen} from '@/app/screen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const RollCallNavigator = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen  name = "RollCallScreen" component={RollCallScreen} />
    </Stack.Navigator>
  )
}

export default RollCallNavigator


