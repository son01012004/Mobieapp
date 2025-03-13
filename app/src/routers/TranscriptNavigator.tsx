import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransciptScreen } from '@/app/screen';

const TranscriptNavigator = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen  name = "TranscriptScreen" component={TransciptScreen} />
    </Stack.Navigator>
  )
}

export default TranscriptNavigator