import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
const Footer = () => {
    return (
        <View style={styles.container}>
      {/* Các nút icon */}
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="home-outline" size={28} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="calendar-outline" size={28} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="qr-code-outline" size={28} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="book-outline" size={28} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="person-outline" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
    );
    };

    const {width} = Dimensions.get('window');

    const styles = StyleSheet.create({
        container: {
          width: width,
          height: 70,
          backgroundColor: '#4a90e2',
          flexDirection: 'row', 
          justifyContent: 'space-around', 
          alignItems: 'center',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          
        },
      
        iconButton: {
          backgroundColor: '#4a90e2',
          padding: 10,
          borderRadius: 15,
        },
    });

    export default Footer;