import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { QrScreen } from '@/app/screen'

const QrCodeNavigator = () => {
 const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen  name = "QrScreen" component={QrScreen} />
    </Stack.Navigator>
  )
}

export default QrCodeNavigator