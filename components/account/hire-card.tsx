import { star } from "@/icons";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Svg, { Path, SvgXml } from "react-native-svg";

const products = [
  require("@/assets/images/vehicles/corolla.png"),
  require("@/assets/images/vehicles/corola.png"),
  require("@/assets/images/vehicles/hyundai.png"),
  require("@/assets/images/vehicles/innova.png"),
];

export const HireCard = ({ index }: { index: number }) => {
  const image = products[index];
  const [saved, setSaved] = useState(false);
  return (
    <Pressable
      style={{
        backgroundColor: "#ffffff",
        flex: 1,
        padding: 8,
        borderRadius: 15,
      }}
      onPress={() => router.push("/account/rides/hire-vehicle/" + index)}
    >
      <View
        style={{
          width: "100%",
          height: 150,
          position: "relative",
        }}
      >
        <Pressable
          onPress={() => setSaved(!saved)}
          style={{
            width: 30,
            height: 30,
            borderRadius: "100%",
            backgroundColor: saved ? "#E0FAD5" : "#EDEDED",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 2,
            position: "absolute",
            right: 10,
            top: 10,
            boxShadow: "0 1px 0 1px rgba(0, 0, 0, 0.03)",
            zIndex: 100,
          }}
        >
          <Svg width="12" height="17" viewBox="0 0 12 17" fill="none">
            <Path
              d="M9.09247 0H2.47976C1.07456 0 0 1.07456 0 2.47976V15.7052C0 15.8705 -8.00613e-08 15.9532 0.0826587 16.1185C0.330635 16.5318 0.826588 16.6144 1.23988 16.4491L5.78612 13.804L10.3324 16.4491C10.4977 16.5318 10.5803 16.5318 10.7456 16.5318C11.2416 16.5318 11.5722 16.2011 11.5722 15.7052V2.47976C11.5722 1.07456 10.4977 0 9.09247 0Z"
              fill={saved ? "#49932C" : "#9F9F9F"}
            />
          </Svg>
        </Pressable>
        <Image
          source={image}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 15,
          }}
        />
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          gap: 6,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "HostGrotesk",
            fontSize: 12,
          }}
        >
          3.6 Rating
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 3,
          }}
        >
          <SvgXml xml={star()} width={12} height={12} />
          <SvgXml xml={star()} width={12} height={12} />
        </View>
      </View>
      <View>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            fontFamily: "HostGroteskBold",
            fontSize: 14,
            marginTop: 4,
          }}
        >
          Toyota Corolla
        </Text>
      </View>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{
          fontFamily: "HostGroteskBold",
          fontSize: 13,
          marginTop: 4,
        }}
      >
        ₦ 20,000/km
      </Text>
    </Pressable>
  );
};
