import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import Container from '../../src/components/Container';
import Swiper from 'react-native-swiper';
import { colors } from '../../src/constants/colors';
import MenuItemsNavigator from '../../src/routers/MenuItemsNavigator';

const HomeScreen = () => {
  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <Image source={require("../../../assets/images/user1.png")} style={styles.profileImage} />
        <Text style={styles.headerText}>Hello, Admin</Text>
      </View>

       {/* MenuItemsNavigator */}
      <View style={{ marginTop: 80 }}>
        <MenuItemsNavigator />
      </View>

      {/* Slider */}
      <View style={styles.sliderContainer}>
        <Swiper autoplay showsPagination dotStyle={styles.dotStyle} activeDotStyle={styles.activeDotStyle}>
          <View style={styles.slide}>
            <Image source={require("../../../assets/images/Sliders/slide1.png")} style={styles.slideImage} />
          </View>
          <View style={styles.slide}>
            <Image source={require("../../../assets/images/Sliders/slide2.png")} style={styles.slideImage} />
          </View>
          <View style={styles.slide}>
            <Image source={require("../../../assets/images/Sliders/slide3.png")} style={styles.slideImage} />
          </View>
        </Swiper>
      </View>
    </>
  );

  return (
    <Container isScroll={false}>
      <FlatList data={[]} renderItem={() => null} ListHeaderComponent={renderHeader} keyExtractor={(item, index) => index.toString()} />
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
    position: 'absolute',
    top: 0,
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
