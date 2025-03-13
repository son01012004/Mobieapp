import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import { HomeScreen, ProfileScreen, QrScreen, TransciptScreen } from '@/app/screen';
import ScheduleScreen from '@/app/screen/scheduleScreen/ScheduleScreen';
import { colors } from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.Azure_Radiance,
          height: 70, // Adjust height as needed
          borderTopWidth: 0,
          paddingTop: 5,
          justifyContent: 'center',
          alignItems: "center"
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIcon: ({ focused }) => {
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
              size={28}
              color={focused ? colors.White : '#ccc'}
            />
          );
        },
      })}
    >
      <Tab.Screen name="HomeScreenTab" component={HomeScreen} />
      <Tab.Screen name="ScheduleScreenTab" component={ScheduleScreen} />
      <Tab.Screen
        name="QrScreenTab"
        component={QrScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: colors.Azure_Radiance,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: -25, // Adjust position as needed
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
              }}
            >
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={30}
                color={colors.White}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen name="TranscriptScreenTab" component={TransciptScreen} />
      <Tab.Screen name="ProfileScreenTab" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;