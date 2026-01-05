import {
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { arrowLeft } from "@/icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

export default function Photos() {
  const app = useSelector((state: any) => state.app);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
          // borderWidth: 1,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={40}
          style={{
            height: 40,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SvgXml xml={arrowLeft()} width={21} height={16} />
        </Pressable>
        <Text
          style={{
            fontFamily: "HostGroteskBold",
            fontSize: 24,
          }}
        >
          Vehicle Photos
        </Text>
        <Pressable
          style={{
            width: 70,
            borderRadius: 100,
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></Pressable>
      </View>
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            marginBottom: 40,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "HostGrotesk",
              color: "#686868",
            }}
          >
            These photos help customers see the vehicle they’ll be riding or
            sending goods with. Clear photos increase booking chances and trust.
          </Text>
        </View>
        <View
          style={{
            gap: 30,
          }}
        >
          {[
            require("@/assets/images/account/image 37.png"),
            require("@/assets/images/account/image 39.png"),
          ].map((item, key) => (
            <View key={key}>
              <ImageBackground
                source={item}
                style={{
                  height: 160,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  padding: 10,
                  borderRadius: 20,
                  overflow: "hidden",
                }}
                imageStyle={{
                  resizeMode: "cover", // or "contain"
                }}
              >
                <View
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 15,
                    borderRadius: 100,
                    backgroundColor: "#FFFFFF",
                    alignSelf: "flex-start",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "HostGroteskBold",
                    }}
                  >
                    Remove
                  </Text>
                </View>
              </ImageBackground>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "HostGrotesk",
                  marginTop: 15,
                }}
              >
                Toyota Corolla . 2019 . Grey
              </Text>
            </View>
          ))}
        </View>
        <Pressable
          style={{
            width: "100%",
            backgroundColor: "#100152",
            paddingVertical: 20,
            borderRadius: 12,
            marginTop: 100,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 20,
          }}
          onPress={() => router.push("/account/marketplace/order-completed/i")}
        >
          <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <Path
              d="M8 1V15M1 8H15"
              stroke="#F5F5F5"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </Svg>
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontFamily: "HostGroteskBold",
              fontSize: 16,
            }}
          >
            Add Photos
          </Text>
        </Pressable>
        <View
          style={{
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "HostGrotesk",
              color: "#686868",
            }}
          >
            Photos must be clear, well-lit, and match your registered vehicle.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
