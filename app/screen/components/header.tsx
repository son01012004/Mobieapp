import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const Header = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Logo */}
        <Image 
          source={require('../../../assets/images/logo.png')} 
          style={styles.logo}
        />
        
        {/* Icon Notification & Menu */}
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="menu" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window'); // lay chieu ngang cua thiet bi

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#ffffff',
  },
  container: {
    width: width, // Phủ hết chiều ngang màn hình
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4a90e2',
    paddingHorizontal: 20,
    paddingTop: 0, // Để tránh notch
    height: 65,
   
    
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    backgroundColor: '#3b74c9',
    padding: 10,
    borderRadius: 20,
  },
});

export default Header;
