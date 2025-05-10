import React, { useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, TextInput, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type StackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
};

type NavigationProp = NativeStackNavigationProp<StackParamList>;

interface LoginProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

import { login as apiLogin } from '../../src/api/authService';

export default function Login({ setIsLoggedIn }: LoginProps) {
  console.log('Debug: Login.tsx - Component loaded');
  console.log('Debug: Login.tsx - Props received:', { setIsLoggedIn });

  const navigation = useNavigation<NavigationProp>();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { width, height } = Dimensions.get('window');

  const handleLogin = async () => {
    if (username.trim() === '') {
      Alert.alert('Lỗi', 'Tên đăng nhập không được để trống.');
      return;
    }
    if (password.trim() === '') {
      Alert.alert('Lỗi', 'Mật khẩu không được để trống.');
      return;
    }

    try {
      const credentials = { username, password };
      const response = await apiLogin(credentials);
      Alert.alert('Thành công', `Chào mừng, ${response.user.username}!`);
      setIsLoggedIn(true);
    } catch (error: any) {
      Alert.alert('Lỗi', error.message || 'Đăng nhập thất bại');
    }
  };

  console.log('Debug: Login.tsx - Style for ImageBackground:', { width: '100%', height, justifyContent: 'center', alignItems: 'center' });
  console.log('Debug: Login.tsx - Style for Text (Đăng nhập):', { fontSize: 28, fontWeight: 'bold', color: '#0047AB', marginBottom: 20, position: 'absolute', top: height * 0.1 });
  console.log('Debug: Login.tsx - Style for TextInput (Tên đăng nhập):', { width: '85%', height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, backgroundColor: 'white' });
  console.log('Debug: Login.tsx - Style for Password View:', { width: '85%', height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' });
  console.log('Debug: Login.tsx - Style for Password TextInput:', { flex: 1, height: '100%' });
  console.log('Debug: Login.tsx - Style for Eye Image:', { width: 24, height: 24, tintColor: '#666', marginRight: 10 });
  console.log('Debug: Login.tsx - Style for Quên mật khẩu Text:', { color: '#0047AB', fontWeight: 'bold' });
  console.log('Debug: Login.tsx - Style for Đăng nhập Button:', { width: '85%', height: 50, backgroundColor: '#0047AB', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginBottom: 20 });
  console.log('Debug: Login.tsx - Style for Đăng nhập Button Text:', { color: 'white', fontSize: 18, fontWeight: 'bold' });
  console.log('Debug: Login.tsx - Style for Tạo tài khoản Text:', { color: '#666', fontSize: 16, marginBottom: 20 });

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../assets/images/Back1.png')}
        style={{ width: '100%', height, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#0047AB', marginBottom: 20, position: 'absolute', top: height * 0.1 }}>
          Đăng nhập
        </Text>

        <TextInput
          style={{ width: '85%', height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, backgroundColor: 'white' }}
          placeholder='Tên đăng nhập'
          placeholderTextColor='#666'
          value={username}
          onChangeText={setUsername}
        />

        <View style={{ width: '85%', height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={{ flex: 1, height: '100%' }}
            placeholder='Mật khẩu'
            placeholderTextColor='#666'
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
            <Image
              source={isPasswordVisible ? require('../../../assets/images/eye.png') : require('../../../assets/images/eye-close.png')}
              style={{ width: 24, height: 24, tintColor: '#666', marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: '10%', marginBottom: 15 }}>
          <Text style={{ color: '#0047AB', fontWeight: 'bold' }}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ width: '85%', height: 50, backgroundColor: '#0047AB', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginBottom: 20 }}
          onPress={handleLogin}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Đăng nhập</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{ color: '#666', fontSize: 16, marginBottom: 20 }}>Tạo tài khoản mới</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}