import { GlowBG } from "@/components/account/glow-bg";
import { arrowLeft } from "@/icons";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

export default function Call() {
  const app = useSelector((state: any) => state.app);

  const router = useRouter();
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
      }}
    >
      <GlowBG />
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <View
          style={{
            position: "relative",
            width: "100%",
          }}
        >
          <Pressable
            onPress={() => router.back()}
            hitSlop={40}
            style={{
              height: 70,
              width: 70,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              left: 10,
              top: 10,
              zIndex: 1000,
            }}
          >
            <SvgXml xml={arrowLeft()} width={21} height={16} />
          </Pressable>
          <Text
            style={{
              color: "#686868",
              fontFamily: "HostGroteskBold",
              fontSize: 18,
              textAlign: "center",
              marginTop: 30,
            }}
          >
            Ongoing call
          </Text>
        </View>

        <View
          style={{
            justifyContent: "space-around",
            flex: 1,
            alignItems: "center",
          }}
        >
          <View>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "100%",
                  backgroundColor: "#100152",
                  padding: 6,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("@/assets/images/logo/white-icon.png")}
                  style={{
                    width: 36,
                    height: 46,
                  }}
                />
              </View>
              <Text
                style={{
                  color: "#000000",
                  fontFamily: "Outfit",
                  fontSize: 29,
                  textAlign: "center",
                  marginTop: 15,
                }}
              >
                AibenMart Support
              </Text>
            </View>
          </View>
          <Pressable
            onPress={() => {
              router.back();
            }}
            style={{
              width: 80,
              height: 80,
              borderRadius: "100%",
              backgroundColor: "#FF3232",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Svg width="39" height="39" viewBox="0 0 39 39" fill="none">
              <Path
                d="M7.98194 17.1291L12.2719 12.8391C12.6981 12.4058 12.9996 11.8656 13.1446 11.2753C13.2896 10.685 13.2727 10.0666 13.0958 9.48512C12.7952 8.49598 12.5296 7.49653 12.2996 6.48863C12.1111 5.60625 11.3359 4.875 10.4324 4.875H7.98194C6.17819 4.875 4.69457 6.344 4.89282 8.138C6.39757 21.775 17.2266 32.6024 30.8619 34.1071C32.6559 34.3054 34.1249 32.8234 34.1249 31.0196V28.5659C34.1249 27.6656 33.3904 26.9246 32.5032 26.7621C31.528 26.5725 30.5653 26.3234 29.6204 26.0163C28.3741 25.6198 26.9896 25.8993 26.0649 26.8223L21.8708 31.018"
                stroke="#F5F5F5"
                stroke-width="2.4375"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </Svg>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
