import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {PaymentScreen} from '@/app/screen'

const Stack = createNativeStackNavigator();
const PaymentNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
    </Stack.Navigator>
  )
}

export default PaymentNavigator

