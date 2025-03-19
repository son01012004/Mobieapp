import { View, Text } from 'react-native'
import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import HomeNavigator from './HomeNavigator'
import DrawerCustom from '../components/DrawerCustom'
import TabNavigator from './TabNavigator'
import RegisterForCoursesNavigator from './RegisterForCoursesNavigator'
const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator()
  return (
    <Drawer.Navigator screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
        
    }} drawerContent={props => <DrawerCustom {...props}/>}> 
        <Drawer.Screen name = 'DrawerMenu' component={TabNavigator}>

        </Drawer.Screen>
        <Drawer.Screen name = 'RegisterForCoursesNavigator' component={RegisterForCoursesNavigator}>

</Drawer.Screen>
        
        

    </Drawer.Navigator>
  )
}

export default DrawerNavigator