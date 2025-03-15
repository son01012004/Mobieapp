import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Sign from '../../screen/Login/Sign-in'
import Login from '../../screen/Login/login';
import Register from '../../screen/Login/register';
const AuthNavigator = () => {

    const Stack  = createNativeStackNavigator()
  return (
   <Stack.Navigator screenOptions ={{headerShown: false}}>
        <Stack.Screen name = "Sign" component={Sign} /> 
        <Stack.Screen name = "Login" component={Login } /> 
        <Stack.Screen name = "Register" component={Register } /> 
    </Stack.Navigator>
  );
};

export default AuthNavigator;