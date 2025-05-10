import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screen/Login/login';

console.log('Debug: AuthNavigator.tsx - LoginScreen imported:', LoginScreen);

const Stack = createNativeStackNavigator();

interface AuthNavigatorProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthNavigator: React.FC<AuthNavigatorProps> = ({ setIsLoggedIn }) => {
  console.log('Debug: AuthNavigator.tsx - Inside AuthNavigator component, setIsLoggedIn:', setIsLoggedIn);
  console.log('Debug: AuthNavigator.tsx - screenOptions:', { headerShown: false });

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Login"
        options={() => {
          console.log('Debug: AuthNavigator.tsx - Stack.Screen options for Login');
          return {};
        }}
      >
        {props => {
          console.log('Debug: AuthNavigator.tsx - Props passed to LoginScreen:', props);
          return <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />;
        }}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthNavigator;