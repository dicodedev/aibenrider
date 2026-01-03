import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "react-native";

export function InputError({ message }: { message: string }) {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        paddingVertical: 6,
      }}
    >
      <FontAwesome name="warning" size={16} color="#F44336" />
      <Text
        style={{
          fontFamily: "HostGrotesk",
          color: "#F44336",
        }}
      >
        {message}
      </Text>
    </View>
  );
}
