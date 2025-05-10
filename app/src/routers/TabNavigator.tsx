import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import { HomeScreen, ProfileScreen, QrScreen, ScheduleScreen, TrainingPointsScreen } from '@/app/screen';
import { colors } from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dispatch, SetStateAction } from 'react';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type TabParamList = {
  HomeScreenTab: undefined;
  ScheduleScreenTab: undefined;
  QrScreenTab: undefined;
  TranscriptScreenTab: undefined;
  ProfileScreenTab: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

interface TabNavigatorProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const TabNavigator: React.FC<TabNavigatorProps> = ({ setIsLoggedIn }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: { name: string } }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.Azure_Radiance,
          height: 70,
          borderTopWidth: 0,
          paddingTop: 5,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
          let iconName;
          switch (route.name) {
            case 'HomeScreenTab':
              iconName = 'home-outline';
              break;
            case 'ScheduleScreenTab':
              iconName = 'calendar-outline';
              break;
            case 'QrScreenTab':
              iconName = 'qrcode-scan';
              break;
            case 'TranscriptScreenTab':
              iconName = 'book-outline';
              break;
            case 'ProfileScreenTab':
              iconName = 'account-outline';
              break;
            default:
              iconName = 'help-circle-outline';
          }

          return (
            <MaterialCommunityIcons
              name={iconName}
              size={size || 28}
              color={focused ? colors.White : '#ccc'}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="HomeScreenTab"
        children={(props) => <HomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      />
      <Tab.Screen
        name="ScheduleScreenTab"
        children={(props) => <ScheduleScreen {...props} />}
      />
      <Tab.Screen
        name="QrScreenTab"
        component={QrScreen}
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: colors.Azure_Radiance,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: -25,
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
              }}
            >
              <MaterialCommunityIcons name="qrcode-scan" size={30} color={colors.White} />
            </View>
          ),
        }}
      />
      <Tab.Screen name="TranscriptScreenTab" component={TrainingPointsScreen} />
      <Tab.Screen
        name="ProfileScreenTab"
        children={(props) => <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;