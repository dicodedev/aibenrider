import { Pressable, StyleSheet, Text, View } from "react-native";

import { arrowLeft } from "@/icons";
import { router } from "expo-router";
import { useState } from "react";
import Svg, { Path, SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

import { Modal } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const options = ["Home", "Work", "Others"];

export default function SelectLocationComponent() {
  const app = useSelector((state: any) => state.app);
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
      edges={["left", "right", "top"]}
    >
      {/* NAV */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          backgroundColor: "#fff",
          width: "100%",
          paddingVertical: 30,
          paddingTop: 20,
          paddingHorizontal: 15,
          zIndex: 1000,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            marginBottom: 15,
            alignItems: "center",
          }}
        >
          <Svg width="18" height="24" viewBox="0 0 18 24" fill="none">
            <Path
              d="M9.79742 22.6744C12.1275 19.7584 17.4419 12.6908 17.4419 8.72093C17.4419 3.90625 13.5356 0 8.72093 0C3.90625 0 0 3.90625 0 8.72093C0 12.6908 5.31432 19.7584 7.64444 22.6744C8.20312 23.3694 9.23874 23.3694 9.79742 22.6744ZM8.72093 5.81395C9.49191 5.81395 10.2313 6.12022 10.7765 6.66539C11.3216 7.21055 11.6279 7.94995 11.6279 8.72093C11.6279 9.49191 11.3216 10.2313 10.7765 10.7765C10.2313 11.3216 9.49191 11.6279 8.72093 11.6279C7.94995 11.6279 7.21055 11.3216 6.66539 10.7765C6.12022 10.2313 5.81395 9.49191 5.81395 8.72093C5.81395 7.94995 6.12022 7.21055 6.66539 6.66539C7.21055 6.12022 7.94995 5.81395 8.72093 5.81395Z"
              fill="#100152"
            />
          </Svg>

          <Text
            style={{
              color: "#2A2A2A",
              textAlign: "center",
              fontFamily: "HostGroteskBold",
              fontSize: 13,
            }}
          >
            123 Main Street, Ikoyi, Lagos State, Nigeria
          </Text>
        </View>
        <Pressable
          style={{
            width: "100%",
            backgroundColor: "#100152",
            paddingVertical: 20,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontFamily: "HostGroteskBold",
              fontSize: 16,
            }}
          >
            USE THIS LOCATION
          </Text>
        </Pressable>
      </View>

      {/* TOOGLES */}
      <View
        style={{
          height: 200,
          width: 50,
          position: "absolute",
          right: 0,
          bottom: 200,
          zIndex: 1000,
          gap: 15,
        }}
      >
        <Pressable
          onPress={() => {}}
          style={{
            width: 40,
            height: 40,
            backgroundColor: "#ffffff",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <Path
              d="M9.33476 1.24464C9.33476 0.556196 8.77857 0 8.09013 0C7.40169 0 6.84549 0.556196 6.84549 1.24464V6.84549H1.24464C0.556196 6.84549 0 7.40169 0 8.09013C0 8.77857 0.556196 9.33476 1.24464 9.33476H6.84549V14.9356C6.84549 15.6241 7.40169 16.1803 8.09013 16.1803C8.77857 16.1803 9.33476 15.6241 9.33476 14.9356V9.33476H14.9356C15.6241 9.33476 16.1803 8.77857 16.1803 8.09013C16.1803 7.40169 15.6241 6.84549 14.9356 6.84549H9.33476V1.24464Z"
              fill="#2A2A2A"
            />
          </Svg>
        </Pressable>
        <Pressable
          onPress={() => {}}
          style={{
            width: 40,
            height: 40,
            backgroundColor: "#ffffff",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Svg width="17" height="3" viewBox="0 0 17 3" fill="none">
            <Path
              d="M16.1803 1.24464C16.1803 1.93307 15.6241 2.48927 14.9356 2.48927H1.24464C0.556196 2.48927 0 1.93307 0 1.24464C0 0.556196 0.556196 0 1.24464 0H14.9356C15.6241 0 16.1803 0.556196 16.1803 1.24464Z"
              fill="#2A2A2A"
            />
          </Svg>
        </Pressable>
        <Pressable
          onPress={() => {}}
          style={{
            width: 40,
            height: 40,
            backgroundColor: "#ffffff",
            borderRadius: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <Path
              d="M7.8412 0C8.38335 0 8.82135 0.438005 8.82135 0.98015V1.2987C11.6914 1.72445 13.958 3.99411 14.3837 6.86105H14.7023C15.2444 6.86105 15.6824 7.29906 15.6824 7.8412C15.6824 8.38335 15.2444 8.82135 14.7023 8.82135H14.3837C13.958 11.6914 11.6883 13.958 8.82135 14.3837V14.7023C8.82135 15.2444 8.38335 15.6824 7.8412 15.6824C7.29906 15.6824 6.86105 15.2444 6.86105 14.7023V14.3837C3.99105 13.958 1.72445 11.6914 1.2987 8.82135H0.98015C0.438005 8.82135 0 8.38335 0 7.8412C0 7.29906 0.438005 6.86105 0.98015 6.86105H1.2987C1.72445 3.99105 3.99105 1.72445 6.86105 1.2987V0.98015C6.86105 0.438005 7.29906 0 7.8412 0ZM3.28963 8.82135C3.6725 10.6071 5.0784 12.0099 6.86105 12.3928V11.7618C6.86105 11.2197 7.29906 10.7817 7.8412 10.7817C8.38335 10.7817 8.82135 11.2197 8.82135 11.7618V12.3928C10.6071 12.0099 12.0099 10.604 12.3928 8.82135H11.7618C11.2197 8.82135 10.7817 8.38335 10.7817 7.8412C10.7817 7.29906 11.2197 6.86105 11.7618 6.86105H12.3928C12.0099 5.07534 10.6071 3.6725 8.82135 3.28963V3.9206C8.82135 4.46275 8.38335 4.90075 7.8412 4.90075C7.29906 4.90075 6.86105 4.46275 6.86105 3.9206V3.28963C5.07534 3.6725 3.6725 5.07534 3.28963 6.86105H3.9206C4.46275 6.86105 4.90075 7.29906 4.90075 7.8412C4.90075 8.38335 4.46275 8.82135 3.9206 8.82135H3.28963ZM7.8412 6.86105C8.10115 6.86105 8.35046 6.96432 8.53427 7.14813C8.71809 7.33194 8.82135 7.58125 8.82135 7.8412C8.82135 8.10115 8.71809 8.35046 8.53427 8.53427C8.35046 8.71809 8.10115 8.82135 7.8412 8.82135C7.58125 8.82135 7.33194 8.71809 7.14813 8.53427C6.96432 8.35046 6.86105 8.10115 6.86105 7.8412C6.86105 7.58125 6.96432 7.33194 7.14813 7.14813C7.33194 6.96432 7.58125 6.86105 7.8412 6.86105Z"
              fill="#100152"
            />
          </Svg>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          paddingVertical: 15,
          width: "100%",
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
            fontSize: 18,
          }}
        >
          Adjust Address
        </Text>
        <Pressable
          style={{
            paddingHorizontal: 10,
          }}
          onPress={() => router.back()}
        >
          <Text
            style={{
              fontFamily: "HostGroteskBold",
              fontSize: 16,
            }}
          >
            Done
          </Text>
        </Pressable>
      </View>
      <MapView
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
        }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="Driver"
        />
      </MapView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flex: 1,
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontFamily: "HostGrotesk",
  },
  input: {
    paddingVertical: 20,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFF5F5",
    marginTop: 8,
    fontFamily: "HostGrotesk",
    flex: 1,
    width: "100%",
  },
  important: {
    color: "#FF4D4D",
  },
  labelContainer: {
    flexDirection: "row",
    gap: 10,
  },
});
