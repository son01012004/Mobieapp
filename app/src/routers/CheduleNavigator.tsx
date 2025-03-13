import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScheduleScreen from '@/app/screen/scheduleScreen/ScheduleScreen';

const CheduleNavigator = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen  name = "CheduleScreen" component={ScheduleScreen} />
    </Stack.Navigator>
  )
}

export default CheduleNavigator