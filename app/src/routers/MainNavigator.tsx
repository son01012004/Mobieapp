import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator'
import DrawerNavigator from './DrawerNavigator'
import { NotificationScreen } from '@/app/screen';
import MenuItemsNavigator from './MenuItemsNavigator';
import PaymentNavigator from './PaymentNavigator';
import TrainingPointsNavigator from './TrainingPointsNavigator';
import PointManagementNavigator from './PointManagementNavigator';
const MainNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainScreen" component={DrawerNavigator} />
            <Stack.Screen name = "NotificationScreen" component={NotificationScreen} />
            <Stack.Screen name="MenuItemsNavigator" component={MenuItemsNavigator} />
            <Stack.Screen name="TrainingPointsNavigator" component={TrainingPointsNavigator} />
            <Stack.Screen name="PaymentNavigator" component={PaymentNavigator} />
            <Stack.Screen name="PointManagementNavigator" component={PointManagementNavigator} />
        </Stack.Navigator>
    );
}

export default MainNavigator;
