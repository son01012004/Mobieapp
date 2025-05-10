import React from 'react';
import { View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export type RootStackParamList = {
  HomeScreenTab: undefined;
  ScheduleScreenTab: undefined;
  QrScreenTab: undefined;
  TranscriptScreenTab: undefined;
  ProfileScreenTab: undefined;
  NotificationScreen: undefined;
};

type Props = {
  children: React.ReactNode;
  title?: string;
  isScroll?: boolean;
  useFlatList?: boolean;
};

const Container = (props: Props) => {
  const { children, title, isScroll, useFlatList } = props;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderContent = () => {
    const contentStyle = { paddingBottom: 70, paddingTop: insets.top + 80 }; // Thêm insets.top vào paddingTop

    if (useFlatList) {
      return (
        <FlatList
          data={[]}
          renderItem={() => null}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={() => <>{children}</>}
          contentContainerStyle={contentStyle}
        />
      );
    } else if (isScroll) {
      return (
        <ScrollView contentContainerStyle={contentStyle}>
          {children}
        </ScrollView>
      );
    } else {
      return <View style={[globalStyles.container, contentStyle]}>{children}</View>;
    }
  };

  return (
    <SafeAreaView style={[globalStyles.container, { flex: 1 }]} edges={['bottom', 'left', 'right']}>
      {/* Header */}
      <View
        style={{
          backgroundColor: colors.Azure_Radiance,
          paddingHorizontal: 15,
          paddingBottom: 10,
          paddingTop: insets.top, // Sử dụng insets.top để tránh bị che bởi thanh trạng thái
          height: 80 + insets.top, // Điều chỉnh chiều cao để bao gồm insets.top
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
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
          <TouchableOpacity
            onPress={() => {
              console.log('Navigating to NotificationScreen');
              navigation.navigate('NotificationScreen');
            }}
          >
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log('Opening Drawer');
              try {
                navigation.dispatch(DrawerActions.openDrawer());
              } catch (error) {
                console.log('Drawer error:', error);
                navigation.navigate('HomeScreenTab');
              }
            }}
          >
            <Ionicons name="menu" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Nội dung */}
      {renderContent()}
    </SafeAreaView>
  );
};

export default Container;