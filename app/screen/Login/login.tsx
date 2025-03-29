import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ImageBackground, Image, TouchableOpacity, TextInput, Alert, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useSSO } from "@clerk/clerk-expo";
import { AuthStackParamList } from "../../src/routers/AuthNavigator";

// Define props interface for Login
interface LoginProps {
  setIsLoging: React.Dispatch<React.SetStateAction<boolean>>;
}

// Type the navigation prop
type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function Login({ setIsLoging }: LoginProps) {
  const navigation = useNavigation<NavigationProp>();
  useWarmUpBrowser();
  const { startSSOFlow } = useSSO();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { width, height } = Dimensions.get("window");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      Alert.alert("Lỗi", "Email không hợp lệ. Vui lòng nhập lại.");
      return;
    }
    if (password.trim() === "") {
      Alert.alert("Lỗi", "Mật khẩu không được để trống.");
      return;
    }
    setIsLoging(true);
  };

  const onGooglePress = useCallback(async () => {
    try {
      const { createdSessionId } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: AuthSession.makeRedirectUri(),
      });

      if (createdSessionId) {
        setIsLoging(true);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Lỗi đăng nhập Google:", err.message);
      } else {
        console.error("Lỗi đăng nhập Google:", err);
      }
    }
  }, [setIsLoging]);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../../assets/images/Back1.png")}
        style={{ width: '100%', height: height, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ fontSize: 28, fontWeight: "bold", color: "#0047AB", marginBottom: 20, position: "absolute", top: height * 0.1 }}>
          Đăng nhập
        </Text>
        
        <TextInput
          style={{ width: "85%", height: 50, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, backgroundColor: "white" }}
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
        />
        
        <View style={{ width: "85%", height: 50, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, backgroundColor: "white", flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={{ flex: 1, height: "100%" }}
            placeholder="Mật khẩu"
            placeholderTextColor="#666"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
            <Image
              source={isPasswordVisible ? require("../../../assets/images/eye.png") : require("../../../assets/images/eye-close.png")}
              style={{ width: 24, height: 24, tintColor: "#666", marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={{ alignSelf: "flex-end", marginRight: "10%", marginBottom: 15 }}>
          <Text style={{ color: "#0047AB", fontWeight: "bold" }}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ width: "85%", height: 50, backgroundColor: "#0047AB", justifyContent: "center", alignItems: "center", borderRadius: 10, marginBottom: 20 }}
          onPress={handleLogin}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Đăng nhập</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{ color: "#666", fontSize: 16, marginBottom: 20 }}>Tạo tài khoản mới</Text>
        </TouchableOpacity>

        <Text style={{ color: "#666", fontSize: 16, marginBottom: 10 }}>Hoặc tiếp tục với</Text>

        <View style={{ flexDirection: "row", gap: 20 }}>
          <TouchableOpacity onPress={onGooglePress}>
            <Image source={require("../../../assets/images/Google.png")} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
          <Image source={require("../../../assets/images/Facebook.png")} style={{ width: 40, height: 40 }} />
          <Image source={require("../../../assets/images/Apple.png")} style={{ width: 40, height: 40 }} />
        </View>
      </ImageBackground>
    </View>
  );
}
