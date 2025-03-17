import { View, Text } from 'react-native'
import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import HomeNavigator from './HomeNavigator'
import DrawerCustom from '../components/DrawerCustom'
import TabNavigator from './TabNavigator'
const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator()
  return (
    <Drawer.Navigator screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
        
    }} drawerContent={props => <DrawerCustom {...props}/>}> 
        <Drawer.Screen name = 'DrawerMenu' component={TabNavigator}>

        </Drawer.Screen>

        
        

    </Drawer.Navigator>
  )
}

export default DrawerNavigator