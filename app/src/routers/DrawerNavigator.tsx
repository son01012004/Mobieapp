import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import DrawerCustom from '../components/DrawerCustom';
import RegisterForCoursesNavigator from './RegisterForCoursesNavigator';
import { Dispatch, SetStateAction } from 'react';

const Drawer = createDrawerNavigator();

interface DrawerNavigatorProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const DrawerNavigator: React.FC<DrawerNavigatorProps> = ({ setIsLoggedIn }) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
      }}
      drawerContent={(props: DrawerContentComponentProps) => <DrawerCustom {...props} />}
    >
      <Drawer.Screen name="DrawerMenu">
        {props => <TabNavigator {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Drawer.Screen>
      <Drawer.Screen name="RegisterForCoursesNavigator" component={RegisterForCoursesNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;