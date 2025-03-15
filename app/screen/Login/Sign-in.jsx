import { ImageBackground, View, Image, TouchableOpacity, Text, Dimensions } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {Button} from '@bsdaoquang/rncomponent';
const { height } = Dimensions.get('window');

const Sign = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../../../assets/images/Back1.png")}
      style={{
        width: '100%',
        height: height,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../../assets/images/Back2.png")}
        style={{
          width: 200,
          height: 200,
          marginTop: -120,
        }}
      />

      {/* View chứa hai nút */}
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 180,
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        {/* Nút Đăng nhập */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")} 
          style={{
            backgroundColor: "#0047AB",
            paddingVertical: 30,
            paddingHorizontal: 30,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            Đăng nhập
          </Text>
        </TouchableOpacity>

        {/* Nút Đăng ký */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={{
            backgroundColor: "white",
            paddingVertical: 30,
            paddingHorizontal: 30,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "white",
          }}
        >
          <Text style={{ color: "#0047AB", fontWeight: "bold", fontSize: 16 }}>
            Đăng ký
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Sign;
