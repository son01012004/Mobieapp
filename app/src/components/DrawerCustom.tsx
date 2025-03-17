import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { DrawerContentComponentProps, DrawerNavigationProp } from '@react-navigation/drawer'; // Import DrawerContentComponentProps
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

// Định nghĩa kiểu cho các route trong DrawerNavigator
type DrawerParamList = {
  DrawerMenu: undefined;
};

// Định nghĩa kiểu cho các route trong TabNavigator
type TabParamList = {
  HomeScreenTab: undefined;
  ScheduleScreenTab: undefined;
  QrScreenTab: undefined;
  TranscriptScreenTab: undefined;
  ProfileScreenTab: undefined;
};

// Định nghĩa kiểu cho các route trong MainNavigator
type RootStackParamList = {
  MainScreen: undefined;
  FrameworkProgram: undefined;
};

// Kiểu cho navigation trong DrawerNavigator
type NavigationProp = DrawerNavigationProp<DrawerParamList, 'DrawerMenu'>;

// Sử dụng DrawerContentComponentProps thay vì định nghĩa thủ công
const DrawerCustom = (props: DrawerContentComponentProps) => {
  const { navigation, state } = props; // Lấy navigation và state từ props

  // Hàm để điều hướng đến các tab trong TabNavigator
  const navigateToTab = (tabName: keyof TabParamList) => {
    navigation.navigate('DrawerMenu', { screen: tabName });
  };

  // Hàm để điều hướng đến các màn hình trong MainNavigator
  const navigateToStack = (screenName: keyof RootStackParamList) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      {/* Header với thông tin người dùng */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/50' }} // Thay bằng URL ảnh thực tế
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Ashfak Sayem</Text>
          <Text style={styles.userEmail}>ashfak.sayem@gmail.com</Text>
        </View>
      </View>

      {/* Danh sách menu */}
      <View style={styles.menuList}>
        <TouchableOpacity
          style={[styles.menuItem, styles.activeItem]}
          onPress={() => navigateToTab('ScheduleScreenTab')}
        >
          <Ionicons name="calendar" size={24} color="#fff" />
          <Text style={styles.menuTextActive}>Lịch học</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigateToTab('TranscriptScreenTab')}
        >
          <Ionicons name="book" size={24} color="#000" />
          <Text style={styles.menuText}>Kết quả học tập</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigateToStack('FrameworkProgram')}
        >
          <Ionicons name="grid" size={24} color="#000" />
          <Text style={styles.menuText}>Chương trình khung</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigateToTab('HomeScreenTab')} // Cần thêm route
        >
          <Ionicons name="create" size={24} color="#000" />
          <Text style={styles.menuText}>Đăng ký học phần</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigateToTab('HomeScreenTab')} // Cần thêm route
        >
          <Ionicons name="cash" size={24} color="#000" />
          <Text style={styles.menuText}>Tham khảo học phí</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigateToTab('HomeScreenTab')} // Cần thêm route
        >
          <Ionicons name="people" size={24} color="#000" />
          <Text style={styles.menuText}>Refer a Friend</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigateToTab('HomeScreenTab')} // Cần thêm route
        >
          <Ionicons name="help" size={24} color="#000" />
          <Text style={styles.menuText}>Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  menuList: {
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  activeItem: {
    backgroundColor: '#6B46C1',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    marginLeft: 15,
  },
  menuTextActive: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    marginLeft: 15,
  },
  badge: {
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default DrawerCustom;