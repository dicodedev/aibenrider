import { Image, Text, View } from "react-native";

import NotFound from "@/assets/images/account/planet.png";

export function NoDataFound({ text }) {
  return (
    <View
      style={{
        marginVertical: 100,
        alignItems: "center",
        gap: 20,
      }}
    >
      <Image
        source={NotFound}
        style={{
          width: 150,
          height: 150,
          borderRadius: 14,
        }}
      />
      <Text
        style={{
          textAlign: "center",
          fontFamily: "HostGrotesk",
          fontSize: 16,
        }}
      >
        {text}
      </Text>
    </View>
  );
}
