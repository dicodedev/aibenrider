import { plusIcon, star } from "@/icons";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Svg, { Path, SvgXml } from "react-native-svg";

const products = [
  require("@/assets/images/landing/Shoe.png"),
  require("@/assets/images/landing/Bag.png"),
  require("@/assets/images/landing/Jug.png"),
  require("@/assets/images/landing/Banana.png"),
  require("@/assets/images/landing/Orange.png"),
  require("@/assets/images/landing/Nike.png"),
];

export const ProductCard = ({ index }: { index: number }) => {
  const image = products[index];
  const [liked, setLiked] = useState(false);
  return (
    <Pressable
      style={{
        backgroundColor: "#ffffff",
        flex: 1,
        padding: 8,
        borderRadius: 15,
      }}
      onPress={() => router.push("/account/marketplace/product/" + index)}
    >
      <View
        style={{
          width: "100%",
          height: 150,
        }}
      >
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
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 6,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "HostGrotesk",
              fontSize: 12,
              width: 60,
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
        <Pressable
          onPress={() => setLiked(!liked)}
          style={{
            width: 30,
            height: 30,
            borderRadius: "100%",
            backgroundColor: "#EDEDED",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 2,
          }}
        >
          <Svg width="20" height="16" viewBox="0 0 20 16" fill="none">
            <Path
              d="M14 0C12.1625 0 10.5438 0.91875 9.625 2.3625C8.70625 0.91875 7.0875 0 5.25 0C2.3625 0 0 2.3625 0 5.25C0 10.4563 9.625 15.75 9.625 15.75C9.625 15.75 19.25 10.5 19.25 5.25C19.25 2.3625 16.8875 0 14 0Z"
              fill={liked ? "#F44336" : "rgba(0, 0, 0, 0.36)"}
            />
          </Svg>
        </Pressable>
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
          Washing Machine Made out of Gold
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,

          backgroundColor: "#F6F6F6",
          height: 50,
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 100,
          paddingLeft: 10,
          paddingRight: 5,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontFamily: "HostGroteskBold",
          }}
        >
          ₦400,000
        </Text>
        <Pressable
          style={{
            width: 35,
            height: 35,
            borderRadius: 100,
            backgroundColor: "#FBAF41",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SvgXml xml={plusIcon()} width={15} height={15} />
        </Pressable>
      </View>
    </Pressable>
  );
};
