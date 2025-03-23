import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { colors } from '../constants/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Định nghĩa kiểu dữ liệu cho các màn hình có thể điều hướng
type RootStackParamList = {
  PaymentNavigator: undefined;
  TrainingPointsNavigator: undefined;
  PointManagementNavigator: undefined;
  NotificationNavigator: undefined;
  // Bạn có thể thêm các màn hình khác nếu cần
};

const menuItems: { id: string; title: string; icon: string; screen?: keyof RootStackParamList }[] = [
 
 
  { id: '1', title: 'Thanh toán', icon: 'wallet', screen: 'PaymentNavigator' },
  { id: '2', title: 'Điểm rèn luyện', icon: 'award', screen: 'TrainingPointsNavigator' },
  { id: '3', title: 'Thống kê điểm danh', icon: 'calendar' }, // Chưa có màn hình
  
];

const MenuItemsNavigator = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.menuWrapper}>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'space-around' }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              if (item.screen) {
                navigation.navigate(item.screen);
              } else {
                console.log('Chưa thiết lập màn hình cho:', item.title);
              }
            }}
          >
            {getIcon(item.icon)}
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Hàm lấy icon tương ứng theo tên được cung cấp
const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'notifications-outline':
      return <Ionicons name={iconName} size={25} color="white" />;
    case 'book':
      return <Octicons name={iconName} size={25} color="white" />;
    case 'wallet':
      return <Entypo name={iconName} size={25} color="white" />;
    case 'award':
      return <FontAwesome6 name={iconName} size={25} color="white" />;
    case 'calendar':
      return <EvilIcons name={iconName} size={25} color="white" />;
    case 'bookmarks-outline':
      return <Ionicons name={iconName} size={25} color="white" />;
    default:
      return <Ionicons name="help-circle-outline" size={25} color="white" />;
  }
};

const styles = StyleSheet.create({
  menuWrapper: {
    backgroundColor: colors.Pastel_Purple,
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    alignSelf: 'center',
    width: '95%',
  },
  menuItem: {
    alignItems: 'center',
    marginVertical: 10,
    width: '30%',
    backgroundColor: colors.Azure_Radiance,
    padding: 10,
    borderRadius: 6,
    elevation: 3,
  },
  menuText: {
    textAlign: 'center',
    marginTop: 3,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
});

export default MenuItemsNavigator;
