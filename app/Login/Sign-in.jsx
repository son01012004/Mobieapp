import { ImageBackground, View, Image, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Link } from "expo-router"; // 🔹 Import Link từ expo-router

export default function Sign() {
  return (
    <ImageBackground
      source={require("../../assets/images/Back1.png")}
      style={{
        width: '100%',
        height: 700,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Image
        source={require("../../assets/images/Back2.png")}
        style={{
          width: 200,
          height: 200,
          marginTop: -120,
        }}
      />

      {/* View chứa hai nút */}
      <View style={{
        flexDirection: "row",
        position: "absolute",
        bottom: 180,
        width: "100%",
        justifyContent: "space-evenly"
      }}>
        {/* Nút Đăng nhập */}
        <Link href="/Login/login" asChild>
          <TouchableOpacity
            style={{
              backgroundColor: "#0047AB",
              paddingVertical: 30,
              paddingHorizontal: 30,
              borderRadius: 10
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Đăng nhập</Text>
          </TouchableOpacity>
        </Link>
 
        {/* Nút Đăng ký */}
        <Link href="/Login/register" asChild>
          <TouchableOpacity
            style={{
              backgroundColor: "white",  // Nền trắng
              paddingVertical: 30,
              paddingHorizontal: 30,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "white"
            }}
          >
            <Text style={{ color: "#0047AB", fontWeight: "bold", fontSize: 16 }}>Đăng ký</Text>
          </TouchableOpacity>
        </Link>

      </View>
    </ImageBackground>
  );
}
