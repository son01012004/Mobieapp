import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, TouchableOpacity, FlatList, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { useNavigation, DrawerActions, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import api from '../../src/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const studentId = 1; // ID sinh viên (có thể thay đổi thành động)

  // Hàm lấy số lượng thông báo chưa đọc
  const fetchUnreadCount = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }

      const response = await api.get(`/api/notifications/unread-count/student/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUnreadCount(response.data);
    } catch (err: any) {
      console.error('Error fetching unread count:', err);
    }
  };

  // Gọi fetchUnreadCount khi màn hình được focus
  useFocusEffect(
    React.useCallback(() => {
      fetchUnreadCount();
    }, [])
  );

  // Cập nhật định kỳ số lượng thông báo chưa đọc (mỗi 60 giây)
  useEffect(() => {
    const interval = setInterval(fetchUnreadCount, 60000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    const contentStyle = { paddingBottom: 70, paddingTop: insets.top + 80 };

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
          paddingTop: insets.top,
          height: 80 + insets.top,
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
            style={styles.bellContainer}
          >
            <Ionicons name="notifications-outline" size={24} color="white" />
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {unreadCount > 99 ? '99+' : unreadCount}
                </Text>
              </View>
            )}
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

const styles = StyleSheet.create({
  bellContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Container;