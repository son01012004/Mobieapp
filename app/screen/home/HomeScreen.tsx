import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Container from '../../src/components/Container';
import Swiper from 'react-native-swiper';
import { colors } from '../../src/constants/colors';
import MenuItemsNavigator from '../../src/routers/MenuItemsNavigator';
import { getProfile, logout } from '../../src/api/authService';

// Định nghĩa kiểu cho các màn hình
type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  ProfileScreen: undefined;
  Register: undefined;
};

// Định nghĩa kiểu cho navigation
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// Định nghĩa kiểu cho props của HomeScreen
interface HomeScreenProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ setIsLoggedIn }) => {
  const navigation = useNavigation<NavigationProp>();
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        setUserName(profile.username);
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Failed to load profile');
        await logout();
        setIsLoggedIn(false);
        navigation.navigate('Login');
      }
    };
    fetchProfile();
  }, [navigation, setIsLoggedIn]);

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    navigation.navigate('Login');
  };

  const handleViewProfile = () => {
    navigation.navigate('ProfileScreen');
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Image source={require('../../../assets/images/user1.png')} style={styles.profileImage} />
      <Text style={styles.headerText}>Hello, {userName}</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Container isScroll={false} useFlatList={false}>
      {renderHeader()}
      <View style={{ marginTop: 20 }}>
        <MenuItemsNavigator />
      </View>
      <View style={styles.sliderContainer}>
        <Swiper autoplay showsPagination dotStyle={styles.dotStyle} activeDotStyle={styles.activeDotStyle}>
          <View style={styles.slide}>
            <Image source={require('../../../assets/images/Sliders/slide1.png')} style={styles.slideImage} />
          </View>
          <View style={styles.slide}>
            <Image source={require('../../../assets/images/Sliders/slide2.png')} style={styles.slideImage} />
          </View>
          <View style={styles.slide}>
            <Image source={require('../../../assets/images/Sliders/slide3.png')} style={styles.slideImage} />
          </View>
        </Swiper>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.Pastel_Purple,
    padding: 12,
    width: '100%',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginLeft: 10,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
    backgroundColor: colors.Pastel_Purple,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
});

export default HomeScreen;