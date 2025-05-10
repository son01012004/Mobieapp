import React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { FrameworkProgramScreen, ProfileScreen } from '@/app/screen'; // Adjust path if needed

const Stack = createNativeStackNavigator();

interface ProfileNavigatorProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileNavigator: React.FC<ProfileNavigatorProps> = ({ setIsLoggedIn }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ProfileScreen"
        children={(props: NativeStackScreenProps<any>) => <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      />
      <Stack.Screen name="FrameworkProgramScreen" component={FrameworkProgramScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;