
import React from 'react';
import { View, Text, Image, SafeAreaView, Dimensions, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Container from '../../src/components/Container';
import TextComponent from '../../src/components/TextComponet';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import {colors} from '../../src/constants/colors'
import Swiper from 'react-native-swiper';
import { StyleSheet } from 'react-native';

const menuItems = [
  { id: '1', title: 'Thông báo', icon: <Ionicons name="notifications-outline" size={25} color="white" />, screen: 'Notifications' },
  { id: '2', title: 'Đăng ký học phần', icon: <Octicons name="book" size={25} color="white" />, screen: 'Register' },
  { id: '3', title: 'Thanh toán', icon: <Entypo name="wallet" size={25} color="white" />, screen: 'Payment' },
  { id: '4', title: 'Điểm rèn luyện', icon: <FontAwesome6 name="award" size={25} color="white" />, screen: 'TrainingPoints' },
  { id: '5', title: 'Thống kê điểm danh', icon: <EvilIcons name="calendar" size={25} color="white" />, screen: 'AttendanceStats' },
  { id: '6', title: 'Quản lý điểm', icon: <Ionicons name="bookmarks-outline" size={25} color="white" />, screen: 'ManageScores' },
];
const HomeScreen = () => {
  return (
    <Container isScroll={true}>
{/* Header */}
<View
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.Pastel_Purple,
    padding: 12,
    width: '100%',
    position: 'absolute',
    top: 0,
  }}
>
  <Image
    source={require("../../../assets/images/user1.png")}
    style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12 }}
  />
  <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
    Hello, Admin
  </Text>
</View>

{/* Menu chính */}
<View
  style={{
    backgroundColor: '#B3E5FC',
    padding: 10,
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
        <Text style={{ textAlign: 'center', marginTop: 3, color: 'white', fontWeight: 'bold', fontSize: 10 }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    )}
  />
</View>
<View style={styles.sliderContainer}>
        <Swiper
          autoplay
          showsPagination
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
        >
          <View style={styles.slide}>
            <Image
              source={require("../../../assets/images/Sliders/slide1.png")}
              style={styles.slideImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require("../../../assets/images/Sliders/slide2.png")}
              style={styles.slideImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require("../../../assets/images/Sliders/slide3.png")}
              style={styles.slideImage}
            />
          </View>
          {/* Thêm các slide khác nếu cần */}
        </Swiper>
      </View>
      
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    height: 200,
    marginTop: 20,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  dotStyle: {
    backgroundColor: '#ccc',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDotStyle: {
    backgroundColor: colors.Pastel_Purple, // Hoặc sử dụng màu bạn muốn
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
});

export default HomeScreen;
