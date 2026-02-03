import { Pressable, Text, View } from "react-native";

import { GlowBG } from "@/components/account/glow-bg";
import { arrowLeft } from "@/icons";
import { router } from "expo-router";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";

export default function NoInternet() {
  return (
    <View style={{ flex: 1 }}>
      <GlowBG />
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 45,
                  fontFamily: "HostGroteskBold",
                  lineHeight: 55,
                }}
              ></Text>
            </View>
            <Pressable
              onPress={() => router.back()}
              hitSlop={40}
              style={{
                height: 70,
                width: 70,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SvgXml xml={arrowLeft()} width={21} height={16} />
            </Pressable>
          </View>
          <View
            style={{
              alignItems: "center",
              paddingTop: 100,
              marginTop: 0,
              paddingHorizontal: 0,
              flex: 1,
            }}
          >
            <Image
              source={require("@/assets/images/account/no-internet.png")}
              style={{
                width: 120,
                height: 120,
                marginBottom: 20,
              }}
            />
            <Text
              style={{
                fontSize: 18,
                fontFamily: "HostGroteskBold",
              }}
            >
              No Connection
            </Text>
            <Text
              style={{
                color: "#A09F9F",
                fontSize: 14,
                fontFamily: "HostGrotesk",
              }}
            >
              An internet error occured, please try again
            </Text>
            <Pressable
              onPress={() => router.back()}
              style={{
                backgroundColor: "#fff",
                marginTop: 30,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  color: "rgb(252, 177, 74)",
                  fontSize: 14,
                  fontFamily: "HostGroteskBold",
                  paddingHorizontal: 60,
                  paddingVertical: 13,
                }}
              >
                Try Again
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
