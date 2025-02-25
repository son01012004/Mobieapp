import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import Sign from "./Login/Sign-in.jsx";

export default function Index() {
  return (
<>
    <View>
<Sign/>
    </View>
    <View
    
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href={'Login/Sign-in'}>
     
        <Text> Gooo to login screen </Text>

     </Link>
    </View>
    </>
  );
}
