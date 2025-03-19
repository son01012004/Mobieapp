import React from 'react';
import { View, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// ✅ Định nghĩa kiểu dữ liệu cho danh sách màn hình
export type RootStackParamList = {
  HomeScreenTab: undefined;
  ScheduleScreenTab: undefined;
  QrScreenTab: undefined;
  TranscriptScreenTab: undefined;
  ProfileScreenTab: undefined;
  NotificationScreen:undefined;
};

type Props = {
  children: React.ReactNode;
  title?: string;
  isScroll?: boolean;
};

const Container = (props: Props) => {
  const { children, title, isScroll } = props;

  // ✅ Thêm kiểu dữ liệu cho useNavigation()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={globalStyles.container}>
      {/* Header */}
      <View
        style={{
          backgroundColor: colors.Azure_Radiance,
          paddingHorizontal: 15,
          paddingBottom: 10,
          height: 80,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreenTab')}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={{ marginLeft: -40, width: 120, height: 100, resizeMode: 'contain' }}
          />
        </TouchableOpacity>

        {/* Icon bên phải */}
        <View style={{ flexDirection: 'row', gap: 15 }}>
          <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer)}>
            <Ionicons name="menu" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Nội dung */}
      {isScroll ? (
        <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>{children}</ScrollView>
      ) : (
        <View style={globalStyles.container}>{children}</View>
      )}
    </SafeAreaView>
  );
};

export default Container;