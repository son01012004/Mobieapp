import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import { NotificationScreen } from '../../screen';
import MenuItemsNavigator from './MenuItemsNavigator';
import PaymentNavigator from './PaymentNavigator';
import TrainingPointsNavigator from './TrainingPointsNavigator';
import PointManagementNavigator from './PointManagementNavigator';
import { Dispatch, SetStateAction } from 'react';

const Stack = createNativeStackNavigator();

interface MainNavigatorProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const MainNavigator: React.FC<MainNavigatorProps> = ({ setIsLoggedIn }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="MainScreen"
        component={(props: any) => <DrawerNavigator {...props} setIsLoggedIn={setIsLoggedIn} />}
      />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="MenuItemsNavigator" component={MenuItemsNavigator} />
      <Stack.Screen name="TrainingPointsNavigator" component={TrainingPointsNavigator} />
      <Stack.Screen name="PaymentNavigator" component={PaymentNavigator} />
      <Stack.Screen name="PointManagementNavigator" component={PointManagementNavigator} />
    </Stack.Navigator>
  );
};

export default MainNavigator;