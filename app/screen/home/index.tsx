import React from 'react';
import { View, Text, Image, SafeAreaView, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesome7 from '@expo/vector-icons/FontAwesome6';

const { width } = Dimensions.get('window');

const menuItems = [
  { id: '1', title: 'Thông báo', icon: <Ionicons name="notifications-outline" size={25} color="white" />, screen: 'Notifications' },
  { id: '2', title: 'Đăng ký học phần', icon: <Octicons name="book" size={25} color="white" />, screen: 'Register' },
  { id: '3', title: 'Thanh toán', icon: <Entypo name="wallet" size={25} color="white" />, screen: 'Payment' },
  { id: '4', title: 'Điểm rèn luyện', icon: <FontAwesome6 name="award" size={25} color="white" />, screen: 'TrainingPoints' },
  { id: '5', title: 'Thống kê điểm danh', icon: <EvilIcons name="calendar" size={25} color="white" />, screen: 'AttendanceStats' },
  { id: '6', title: 'Quản lý điểm', icon: <Ionicons name="bookmarks-outline" size={25} color="white" />, screen: 'ManageScores' },
];

export default function Home() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
 

      {/* Nội dung chính */}
      <View style={{ flex: 1, width: '100%' }}>
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#4a90e2',
      padding: 12,
      width: '100%', // Tràn toàn bộ chiều ngang
      borderRadius: 0, // Bỏ bo góc nếu cần
      position: 'absolute',
      top: 0, // Đẩy lên gần đầu
    }}
  >
    <Image
      source={require("../../../assets/images/user1.png")}
      style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12 }}
    />
    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', flexShrink: 1 }}>
      Hello, Admin
    </Text>
  </View>

  {/* Khung menu */}
  <View
        style={{
          backgroundColor: '#B3E5FC',
          padding:10,
          borderRadius: 10,
          marginTop: 80,
          width: '95%',
          alignSelf: 'center',
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        }}
      >
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => (
            <TouchableOpacity
              
              style={{
                alignItems: 'center',
                marginVertical: 10,
                width: '30%',
                backgroundColor: '#1976D2',
                padding: 10,
                borderRadius: 6,
                elevation: 3,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
              }}
            >
              {item.icon}
              <Text style={{ textAlign: 'center', marginTop: 3, color: 'white', fontWeight: 'bold', fontSize: 10 }}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      </View>

    </SafeAreaView>
  );
}
