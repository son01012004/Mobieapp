import { View, Text } from 'react-native'
import React from 'react'
import { TrainingPointsScreen } from '@/app/screen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const TrainingPointsNavugator = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen  name = "TrainingPointsScreen" component={TrainingPointsScreen} />
</Stack.Navigator>
  )
}

export default TrainingPointsNavugator