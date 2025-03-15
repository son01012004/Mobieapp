import { View, Text, ImageBackground, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

export default function Register() { 
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (!email) {
      Alert.alert("Lỗi", "Vui lòng nhập email!");
      return;
    }
    if (!password) {
      Alert.alert("Lỗi", "Vui lòng nhập mật khẩu!");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp!");
      return;
    }

    // Hiển thị thông báo và điều hướng về trang đăng nhập
    Alert.alert("Thành công", "Đăng ký thành công!", [
      { text: "OK", onPress: () => router.replace("/screen/Login/login") }
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../../assets/images/Back1.png")}
        style={{
          width: "100%",
          height: 700,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
 
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "#0047AB",
            marginBottom: 20,
            position: "absolute",
            top: 80,
          }}
        >
          Đăng Ký
        </Text>

        {/* Ô nhập Email */}
        <TextInput
          style={{
            width: "85%",
            height: 50,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            paddingHorizontal: 15,
            marginBottom: 15,
            backgroundColor: "white",
          }}
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
        />

        {/* Ô nhập Password */}
        <TextInput
          style={{
            width: "85%",
            height: 50,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            paddingHorizontal: 15,
            marginBottom: 15,
            backgroundColor: "white",
          }}
          placeholder="Password"
          placeholderTextColor="#666"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Ô nhập Confirm Password */}
        <TextInput
          style={{
            width: "85%",
            height: 50,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            paddingHorizontal: 15,
            marginBottom: 15,
            backgroundColor: "white",
          }}
          placeholder="Confirm Password"
          placeholderTextColor="#666"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {/* Nút Đăng ký */}
        <TouchableOpacity
          style={{
            width: "85%",
            height: 50,
            backgroundColor: "#0047AB",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            marginBottom: 20,
          }}
          onPress={handleRegister}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Đăng Ký
          </Text>
        </TouchableOpacity>

        {/* Đã có tài khoản */}
        <TouchableOpacity onPress={() => router.replace("/screen/Login/login")}>
          <Text style={{ color: "#666", fontSize: 16, marginBottom: 20 }}>
            Đã có tài khoản
          </Text>
        </TouchableOpacity>

        <Text style={{ color: "#666", fontSize: 16, marginBottom: 10 }}>
          Tiếp tục với
        </Text>

        <View style={{ flexDirection: "row", gap: 20 }}>
          <Image
            source={require("../../../assets/images/Google.png")}
            style={{ width: 40, height: 40 }}
          />
          <Image
            source={require("../../../assets/images/Facebook.png")}
            style={{ width: 40, height: 40 }}
          />
          <Image
            source={require("../../../assets/images/Apple.png")}
            style={{ width: 40, height: 40 }}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
