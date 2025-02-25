import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/header';
import Footer from '../components/footer';


export default function Home() {
  return (
    <>
      <View>
        <Header />
      </View>
      <View style={styles.container}>
        <Text>Home</Text>
      </View>

      <View>
        <Footer />
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});