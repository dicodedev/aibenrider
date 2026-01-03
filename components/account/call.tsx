import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { GlowBG } from "./glow-bg";

export const Call = ({ setCall }: { setCall: any }) => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 10000,
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
        <View
          style={{
            justifyContent: "space-around",
            flex: 1,
            alignItems: "center",
          }}
        >
          <View>
            <View>
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "100%",
                  backgroundColor: "#A380FF",
                  padding: 6,
                }}
              >
                <Image
                  source={{ uri: "https://avatar.iran.liara.run/public" }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 100,
                  }}
                />
              </View>
              <Text
                style={{
                  color: "#000000",
                  fontFamily: "HostGroteskBold",
                  fontSize: 24,
                  textAlign: "center",
                  marginTop: 15,
                }}
              >
                Calling...
              </Text>
            </View>
          </View>
          <Pressable
            onPress={() => setCall(false)}
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
};
