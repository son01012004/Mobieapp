import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import Sign from '../../screen/Login/Sign-in';
import Login from '../../screen/Login/login';
import Register from '../../screen/Login/register';

// Define the param list for AuthNavigator
export type AuthStackParamList = {
  Sign: undefined;
  Login: undefined;
  Register: undefined;
};

// Define the navigation prop type
type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

// Define the props interface for AuthNavigator
interface AuthNavigatorProps {
  setIsLoging: React.Dispatch<React.SetStateAction<boolean>>;
}

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC<AuthNavigatorProps> = ({ setIsLoging }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Sign" component={Sign} />
      <Stack.Screen name="Login">
        {props => <Login {...props} setIsLoging={setIsLoging} />}
      </Stack.Screen>
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;