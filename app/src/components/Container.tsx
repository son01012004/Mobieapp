import React from 'react';
import { View, ScrollView, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  HomeScreenTab: undefined;
  ScheduleScreenTab: undefined;
  QrScreenTab: undefined;
  TranscriptScreenTab: undefined;
  ProfileScreenTab: undefined;
};

type Props = {
  children: React.ReactNode;
  title?: string;
  isScroll?: boolean;
  useFlatList?: boolean; // Thêm prop để hỗ trợ FlatList
};

const Container = (props: Props) => {
  const { children, title, isScroll, useFlatList } = props;

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderContent = () => {
    if (useFlatList) {
      return (
        <FlatList
          data={[]}
          renderItem={() => null}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={() => <>{children}</>}
          contentContainerStyle={{ paddingBottom: 70 }}
        />
      );
    } else if (isScroll) {
      return <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>{children}</ScrollView>;
    } else {
      return <View style={globalStyles.container}>{children}</View>;
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      {/* Header */}
      <View
        style={{
          backgroundColor: colors.Azure_Radiance,
          paddingHorizontal: 15,
          paddingBottom: 10,
          height: 80,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
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
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Ionicons name="menu" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Nội dung */}
      {renderContent()}
    </SafeAreaView>
  );
};

export default Container;