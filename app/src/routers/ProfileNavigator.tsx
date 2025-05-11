import React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { FrameworkProgramScreen, ProfileScreen } from '@/app/screen';

const Stack = createNativeStackNavigator();

type RootStackParamList = {
  ProfileScreen: undefined;
  FrameworkProgramScreen: { studentId: string };
};

interface ProfileNavigatorProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileNavigator: React.FC<ProfileNavigatorProps> = ({ setIsLoggedIn }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ProfileScreen"
        // Use a wrapper component to inject setIsLoggedIn
        children={(props) => <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      />
      <Stack.Screen
        name="FrameworkProgramScreen"
        component={FrameworkProgramScreen}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;